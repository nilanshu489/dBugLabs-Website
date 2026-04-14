import nodemailer from 'nodemailer';

// Create Gmail transporter using env credentials
const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send contact form email
export const sendContactEmail = async ({ name, email, message }) => {
  const transporter = createTransporter();

  // Email to admin (dBug Labs team)
  const adminMailOptions = {
    from: `"dBug Labs Contact" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO || 'dbuglabs@gmail.com',
    subject: `📬 New Contact Form Submission from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #9333EA, #EC4899); padding: 24px; border-radius: 8px 8px 0 0;">
          <h2 style="color: white; margin: 0;">📬 New Contact Form Submission</h2>
        </div>
        <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #eee;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message:</strong></p>
          <div style="background: white; padding: 16px; border-radius: 6px; border-left: 4px solid #9333EA;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <p style="color: #999; font-size: 12px; margin-top: 24px;">
            Sent from the dBug Labs website contact form.
          </p>
        </div>
      </div>
    `,
    text: `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nSent from the dBug Labs website contact form.`,
  };

  // Thank-you email to the user
  const thankYouMailOptions = {
    from: `"dBug Labs" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
    to: email,
    subject: '✅ Thank you for contacting dBug Labs!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #9333EA, #EC4899); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0;">dBug Labs</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0;">SRM University</p>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #eee;">
          <h2 style="color: #333;">Hi ${name} 👋</h2>
          <p style="color: #555; line-height: 1.7;">
            Thank you for reaching out to <strong>dBug Labs</strong>! We've received your message and will get back to you as soon as possible.
          </p>
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #9333EA;">
            <p style="color: #999; font-size: 12px; margin: 0 0 8px;">YOUR MESSAGE:</p>
            <p style="color: #333; margin: 0;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          <p style="color: #555; line-height: 1.7;">
            In the meantime, follow us on Instagram to stay updated with our latest events and projects!
          </p>
          <div style="text-align: center; margin-top: 28px;">
            <a href="https://instagram.com/dBugLabs"
               style="display: inline-block; background: linear-gradient(135deg, #9333EA, #EC4899); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">
              @dBugLabs on Instagram
            </a>
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 28px 0;">
          <p style="color: #999; font-size: 12px; text-align: center;">
            This is an automated response. Please do not reply to this email.
          </p>
        </div>
      </div>
    `,
    text: `Hi ${name},\n\nThank you for reaching out to dBug Labs! We've received your message and will get back to you soon.\n\nYour message:\n${message}\n\n---\ndBug Labs | SRM University\nInstagram: @dBugLabs`,
  };

  // Send both emails
  await transporter.sendMail(adminMailOptions);
  console.log(`✅ Admin notification sent for contact from: ${name} <${email}>`);

  await transporter.sendMail(thankYouMailOptions);
  console.log(`✅ Thank-you email sent to: ${email}`);

  return true;
};
