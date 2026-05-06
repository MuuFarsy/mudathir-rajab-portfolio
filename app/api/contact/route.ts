import { NextResponse } from 'next/server';

const nodemailer = require('nodemailer') as {
  createTransport: (options: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
  }) => {
    sendMail: (options: {
      from: string;
      to: string;
      replyTo: string;
      subject: string;
      text: string;
      html: string;
    }) => Promise<{ messageId?: string }>;
  };
};

const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT || 0);
const smtpSecure = process.env.SMTP_SECURE === 'true';
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const senderEmail = process.env.PORTFOLIO_SENDER_EMAIL;
const receiverEmail = process.env.PORTFOLIO_RECEIVER_EMAIL;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const runtime = 'nodejs';

type MailConfig = {
  senderEmail: string;
  receiverEmail: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function createDetailRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding: 0 0 8px; font-size: 13px; color: #64748b; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase;">
        ${label}
      </td>
    </tr>
    <tr>
      <td style="padding: 0 0 18px; font-size: 16px; line-height: 1.6; color: #0f172a;">
        ${value}
      </td>
    </tr>
  `;
}

function createEmailHtml(details: {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  budget: string;
  subject: string;
  message: string;
}) {
  return `
    <div style="margin: 0; padding: 32px 16px; background: #e2e8f0;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
        <tr>
          <td align="center">
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 720px; border-collapse: collapse; font-family: Arial, sans-serif;">
              <tr>
                <td style="padding-bottom: 20px; text-align: center; font-size: 13px; color: #475569; letter-spacing: 0.08em; text-transform: uppercase;">
                  Mudathir Rajab Portfolio
                </td>
              </tr>
              <tr>
                <td style="background: linear-gradient(135deg, #0f172a 0%, #1d4ed8 100%); border-radius: 28px 28px 0 0; padding: 36px 32px; color: #ffffff;">
                  <div style="font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.8;">
                    New Contact Form Submission
                  </div>
                  <h1 style="margin: 14px 0 10px; font-size: 30px; line-height: 1.2; font-weight: 700;">
                    ${details.subject}
                  </h1>
                  <p style="margin: 0; font-size: 16px; line-height: 1.7; color: rgba(255, 255, 255, 0.88);">
                    A new inquiry was sent from your portfolio website. The sender details and message are included below.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="background: #ffffff; padding: 32px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                    <tr>
                      <td style="padding: 0 0 20px; font-size: 18px; font-weight: 700; color: #0f172a;">
                        Contact Details
                      </td>
                    </tr>
                  </table>
                  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 20px;">
                    <tr>
                      <td style="padding: 24px 24px 6px;">
                        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                          ${createDetailRow('Full Name', details.fullName)}
                          ${createDetailRow('Email Address', details.email)}
                          ${createDetailRow('Phone Number', details.phone)}
                          ${createDetailRow('Company or Brand', details.company)}
                          ${createDetailRow('Budget Range', details.budget)}
                        </table>
                      </td>
                    </tr>
                  </table>
                  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; margin-top: 28px;">
                    <tr>
                      <td style="padding: 0 0 16px; font-size: 18px; font-weight: 700; color: #0f172a;">
                        Message
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 24px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 20px; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);">
                        <p style="margin: 0; font-size: 16px; line-height: 1.9; color: #1e293b; white-space: pre-wrap;">
                          ${details.message}
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="background: #ffffff; border-radius: 0 0 28px 28px; padding: 0 32px 32px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 18px;">
                    <tr>
                      <td style="padding: 18px 22px; font-size: 14px; line-height: 1.7; color: #1e3a8a;">
                        Reply directly to this email to respond to <strong>${details.fullName}</strong> at <strong>${details.email}</strong>.
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  `;
}

function createTransporter() {
  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !senderEmail || !receiverEmail) {
    return null;
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });
}

function getMailConfig(): MailConfig | null {
  if (!senderEmail || !receiverEmail) {
    return null;
  }

  return {
    senderEmail,
    receiverEmail,
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
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

    const transporter = createTransporter();
    const mailConfig = getMailConfig();

    if (!transporter || !mailConfig) {
      return NextResponse.json(
        {
          error:
            'Email service is not configured yet. Add SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, PORTFOLIO_SENDER_EMAIL, and PORTFOLIO_RECEIVER_EMAIL to your environment variables.',
        },
        { status: 500 }
      );
    }

    const safeFullName = escapeHtml(fullName);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || 'Not provided');
    const safeCompany = escapeHtml(company || 'Not provided');
    const safeBudget = escapeHtml(budget);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message);
    const emailHtml = createEmailHtml({
      fullName: safeFullName,
      email: safeEmail,
      phone: safePhone,
      company: safeCompany,
      budget: safeBudget,
      subject: safeSubject,
      message: safeMessage,
    });

    const info = await transporter.sendMail({
      from: mailConfig.senderEmail,
      to: mailConfig.receiverEmail,
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      text: [
        'New portfolio inquiry',
        `Full Name: ${fullName}`,
        `Email Address: ${email}`,
        `Phone Number: ${phone || 'Not provided'}`,
        `Company or Brand: ${company || 'Not provided'}`,
        `Budget Range: ${budget}`,
        `Subject: ${subject}`,
        '',
        'Message',
        message,
      ].join('\n'),
      html: emailHtml,
    });

    return NextResponse.json({ success: true, id: info.messageId ?? null });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Unable to send the message right now.',
      },
      { status: 500 }
    );
  }
}
