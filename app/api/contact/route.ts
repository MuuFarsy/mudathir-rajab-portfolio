import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const senderEmail = process.env.PORTFOLIO_SENDER_EMAIL;
const receiverEmail = process.env.PORTFOLIO_RECEIVER_EMAIL;

const resend = resendApiKey ? new Resend(resendApiKey) : null;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const runtime = 'nodejs';

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const company = typeof body.company === 'string' ? body.company.trim() : '';
    const budget = typeof body.budget === 'string' ? body.budget.trim() : '';
    const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (!fullName || !email || !subject || !message || !budget) {
      return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 });
    }

    if (!emailPattern.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (!resend || !senderEmail || !receiverEmail) {
      return NextResponse.json(
        {
          error:
            'Email service is not configured yet. Add RESEND_API_KEY, PORTFOLIO_SENDER_EMAIL, and PORTFOLIO_RECEIVER_EMAIL to your environment variables.',
        },
        { status: 500 }
      );
    }

    const safeFullName = escapeHtml(fullName);
    const safeEmail = escapeHtml(email);
    const safeCompany = escapeHtml(company || 'Not provided');
    const safeBudget = escapeHtml(budget);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message);

    const { data, error } = await resend.emails.send({
      from: senderEmail,
      to: [receiverEmail],
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      text: [
        'New portfolio inquiry',
        `Full Name: ${fullName}`,
        `Email Address: ${email}`,
        `Company or Brand: ${company || 'Not provided'}`,
        `Budget Range: ${budget}`,
        `Subject: ${subject}`,
        '',
        'Message',
        message,
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #0f172a; max-width: 700px; margin: 0 auto;">
          <h2 style="margin-bottom: 16px;">New portfolio inquiry</h2>
          <p><strong>Full Name:</strong> ${safeFullName}</p>
          <p><strong>Email Address:</strong> ${safeEmail}</p>
          <p><strong>Company or Brand:</strong> ${safeCompany}</p>
          <p><strong>Budget Range:</strong> ${safeBudget}</p>
          <p><strong>Subject:</strong> ${safeSubject}</p>
          <div style="margin-top: 20px; padding: 20px; border-radius: 16px; background: #f8fafc; border: 1px solid #e2e8f0;">
            <p style="margin: 0 0 12px;"><strong>Message</strong></p>
            <p style="margin: 0; white-space: pre-wrap;">${safeMessage}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message || 'Unable to send the message right now.' }, { status: 502 });
    }

    return NextResponse.json({ success: true, id: data?.id ?? null });
  } catch {
    return NextResponse.json({ error: 'Unable to send the message right now.' }, { status: 500 });
  }
}
