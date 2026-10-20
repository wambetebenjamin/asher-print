import nodemailer from "nodemailer";

type MailInput = {
  subject: string;
  text: string;
  replyTo?: string;
};

function smtpConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.SMTP_FROM,
  );
}

/**
 * Sends mail through nodemailer when SMTP is configured.
 * In development without SMTP settings it logs and reports sent: false so
 * callers can still complete the user flow honestly.
 */
export async function sendMail({ subject, text, replyTo }: MailInput): Promise<boolean> {
  if (!smtpConfigured()) {
    console.info(`[mail:skipped no SMTP configured] ${subject}`);
    return false;
  }
  const port = Number(process.env.SMTP_PORT);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.SMTP_FROM,
    replyTo,
    subject,
    text,
  });
  return true;
}
