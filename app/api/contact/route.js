import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const DEFAULT_CONTACT_EMAIL = 'rootlinelab.info@gmail.com';

// Maximum accepted length per field, to keep oversized payloads out of the inbox
const FIELD_LIMITS = {
  name: 100,
  email: 254,
  phone: 40,
  company: 120,
  service: 80,
  budget: 80,
  message: 5000,
};

// Normalize an incoming value to a trimmed string within its length limit.
// Single-line fields also have line breaks collapsed into spaces.
function clean(value, limit, { multiline = false } = {}) {
  if (typeof value !== 'string') return '';
  const text = multiline ? value : value.replace(/[\r\n]+/g, ' ');
  return text.trim().slice(0, limit);
}

// Escape visitor input before placing it inside an HTML email body
function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Fixed confirmation sent to the visitor. It never echoes visitor input,
// so the form cannot be used to send arbitrary text to someone else's address.
function buildAutoReply({ user, toEmail, email }) {
  return {
    from: `"Rootline Lab" <${user}>`,
    to: email,
    replyTo: toEmail,
    subject: 'We received your inquiry — Rootline Lab',
    text: `
Hello,

Thank you for contacting Rootline Lab. We have received your project inquiry and a member of our team will reply within 24 hours.

If you need to add anything, simply reply to this email.

— The Rootline Lab Team
    `,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #146375; border-radius: 12px; background: #FBFAF2; color: #0B2A33;">
        <h2 style="color: #146375; margin-top: 0;">Thank you for reaching out</h2>
        <p>Hello,</p>
        <p>Thank you for contacting Rootline Lab. We have received your project inquiry and a member of our team will reply within <strong>24 hours</strong>.</p>
        <p>If you need to add anything, simply reply to this email.</p>
        <hr style="border: 0; border-top: 1px solid #EEF3EE; margin: 20px 0;" />
        <p style="margin-bottom: 0; color: #146375;"><strong>The Rootline Lab Team</strong></p>
      </div>
    `,
  };
}

export async function POST(request) {
  try {
    const data = await request.json();

    // Honeypot check for spam bots
    if (typeof data.honeypot === 'string' && data.honeypot.trim() !== '') {
      // Silently return success to fool bots
      return NextResponse.json({ success: true, message: 'Submission received.' }, { status: 200 });
    }

    const name = clean(data.name, FIELD_LIMITS.name);
    const email = clean(data.email, FIELD_LIMITS.email);
    const phone = clean(data.phone, FIELD_LIMITS.phone);
    const company = clean(data.company, FIELD_LIMITS.company);
    const service = clean(data.service, FIELD_LIMITS.service);
    const budget = clean(data.budget, FIELD_LIMITS.budget);
    const message = clean(data.message, FIELD_LIMITS.message, { multiline: true });

    // Required fields validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Please provide your name, email, and a short message.' },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // Check if SMTP environment variables are present
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT) || 587;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    // Accepts one address or a comma-separated list
    const toEmail = process.env.CONTACT_EMAIL || DEFAULT_CONTACT_EMAIL;

    if (!host || !user || !pass) {
      if (process.env.NODE_ENV === 'production') {
        // Never tell a visitor their inquiry arrived when it could not be delivered
        console.error('Contact route error: SMTP is not configured; inquiry was not delivered.');
        return NextResponse.json(
          {
            success: false,
            error: `Our inquiry form is temporarily unavailable. Please email us directly at ${DEFAULT_CONTACT_EMAIL}.`,
          },
          { status: 503 }
        );
      }

      // In development, log the submission cleanly instead of sending it
      console.log('--- [CONTACT FORM SUBMISSION] ---');
      console.log('From:', name, `(${email})`);
      console.log('Service:', service);
      console.log('Budget:', budget);
      console.log('Message:', message);
      console.log('SMTP not fully configured; message logged to server output.');
    } else {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });

      const safe = {
        name: escapeHtml(name),
        email: escapeHtml(email),
        phone: escapeHtml(phone || 'Not provided'),
        company: escapeHtml(company || 'Not provided'),
        service: escapeHtml(service || 'General Inquiry'),
        budget: escapeHtml(budget || 'Not specified'),
        message: escapeHtml(message),
      };

      const mailOptions = {
        from: `"Rootline Lab Website" <${user}>`,
        to: toEmail,
        replyTo: email,
        subject: `New Project Inquiry from ${name} (${service || 'General'})`,
        text: `
New Project Inquiry - Rootline Lab
------------------------------------
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Company: ${company || 'Not provided'}
Service Interested: ${service || 'General Inquiry'}
Budget Range: ${budget || 'Not specified'}

Message:
${message}
        `,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #146375; border-radius: 12px; background: #FBFAF2; color: #0B2A33;">
            <h2 style="color: #146375; margin-top: 0;">New Project Inquiry — Rootline Lab</h2>
            <p><strong>Name:</strong> ${safe.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${safe.email}" style="color: #146375;">${safe.email}</a></p>
            <p><strong>Phone:</strong> ${safe.phone}</p>
            <p><strong>Company:</strong> ${safe.company}</p>
            <p><strong>Service:</strong> ${safe.service}</p>
            <p><strong>Budget Range:</strong> ${safe.budget}</p>
            <hr style="border: 0; border-top: 1px solid #EEF3EE; margin: 20px 0;" />
            <h4 style="margin-bottom: 8px;">Message:</h4>
            <p style="white-space: pre-wrap; background: #FFFFFF; padding: 16px; border-radius: 8px; border: 1px solid #EEF3EE;">${safe.message}</p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);

      // The inquiry has reached the team, so a failed confirmation must not fail the request
      try {
        await transporter.sendMail(buildAutoReply({ user, toEmail, email }));
      } catch (autoReplyError) {
        console.error('Contact route auto-reply error:', autoReplyError);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for reaching out. We have received your inquiry and will respond within 24 hours.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact route error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred while sending your message. Please try again or email us directly.' },
      { status: 500 }
    );
  }
}
