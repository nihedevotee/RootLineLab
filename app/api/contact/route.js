import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, phone, company, service, budget, message, honeypot } = data;

    // Honeypot check for spam bots
    if (honeypot && honeypot.trim() !== '') {
      // Silently return success to fool bots
      return NextResponse.json({ success: true, message: 'Submission received.' }, { status: 200 });
    }

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
    const toEmail = process.env.CONTACT_EMAIL || 'rootlinelab.info@gmail.com';

    if (host && user && pass) {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });

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
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #146375;">${email}</a></p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Company:</strong> ${company || 'Not provided'}</p>
            <p><strong>Service:</strong> ${service || 'General Inquiry'}</p>
            <p><strong>Budget Range:</strong> ${budget || 'Not specified'}</p>
            <hr style="border: 0; border-top: 1px solid #EEF3EE; margin: 20px 0;" />
            <h4 style="margin-bottom: 8px;">Message:</h4>
            <p style="white-space: pre-wrap; background: #FFFFFF; padding: 16px; border-radius: 8px; border: 1px solid #EEF3EE;">${message}</p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
    } else {
      // In development or when SMTP is unconfigured, log the submission cleanly
      console.log('--- [CONTACT FORM SUBMISSION] ---');
      console.log('From:', name, `(${email})`);
      console.log('Service:', service);
      console.log('Budget:', budget);
      console.log('Message:', message);
      console.log('SMTP not fully configured; message logged to server output.');
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
