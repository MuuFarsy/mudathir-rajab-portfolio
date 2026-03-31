import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const portfolioEmail = process.env.PORTFOLIO_RECEIVER_EMAIL;
const senderEmail = process.env.PORTFOLIO_SENDER_EMAIL;

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, company, budget, subject, message } = body;

    if (!fullName || !email || !subject || !message || !budget) {
      return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 });
    }

    if (!resend || !portfolioEmail || !senderEmail) {
      return NextResponse.json(
        {
          error:
            'Email service is not configured yet. Add RESEND_API_KEY, PORTFOLIO_RECEIVER_EMAIL, and PORTFOLIO_SENDER_EMAIL to your environment variables.',
        },
        { status: 500 }
      );
    }

    await resend.emails.send({
      from: senderEmail,
      to: portfolioEmail,
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #0f172a; max-width: 700px; margin: 0 auto;">
          <h2 style="margin-bottom: 16px;">New portfolio inquiry</h2>
          <p><strong>Full Name:</strong> ${fullName}</p>
          <p><strong>Email Address:</strong> ${email}</p>
          <p><strong>Company or Brand:</strong> ${company || 'Not provided'}</p>
          <p><strong>Budget Range:</strong> ${budget}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="margin-top: 20px; padding: 20px; border-radius: 16px; background: #f8fafc; border: 1px solid #e2e8f0;">
            <p style="margin: 0 0 12px;"><strong>Message</strong></p>
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Unable to send the message right now.' }, { status: 500 });
  }
}
