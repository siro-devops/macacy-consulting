import 'dotenv/config';
import nodemailer from 'nodemailer';

let transporter = null;

export function getTransport() {
  if (transporter) return transporter;
  if (!process.env.SMTP_HOST) {
    throw new Error('SMTP_HOST not configured. Check server/.env');
  }
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  transporter.verify((err) => {
    if (err) console.error('SMTP verification failed:', err.message);
    else console.log('SMTP ready');
  });
  return transporter;
}

export async function sendLeadNotification(lead) {
  const t = getTransport();
  const html = `
    <h2>New ${lead.source || 'lead'}</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
      ${Object.entries(lead)
        .filter(([k]) => k !== 'id' && k !== 'createdAt')
        .map(([k, v]) => `<tr><td style="border:1px solid #ddd;background:#f5f5f5;font-weight:600;">${k}</td><td style="border:1px solid #ddd;">${typeof v === 'object' ? JSON.stringify(v) : v}</td></tr>`)
        .join('')}
    </table>
  `;
  await t.sendMail({
    from: process.env.MAIL_FROM,
    to: 'hello@macacy.com',
    subject: `New ${lead.source || 'lead'} — ${lead.name || lead.email}`,
    text: JSON.stringify(lead, null, 2),
    html,
  });
}

function getDownloadLink(source) {
  const base = process.env.PUBLIC_SITE_URL || 'https://macacy.com';
  if (source === 'checklist-download' || source === '48-point-checklist') {
    return {
      label: '48-Point Pre-Import Checklist',
      url: `${base}/downloads/48-point-checklist.pdf`,
    };
  }
  if (source === 'spec-guide-download') {
    return {
      label: 'Machinery Specification Guide and Template',
      url: `${base}/downloads/spec-guide.pdf`,
    };
  }
  return null;
}

export async function sendVisitorConfirmation(lead) {
  if (!lead.email) return;
  const t = getTransport();
  const firstName = (lead.name || '').split(' ')[0] || 'there';
  const download = getDownloadLink(lead.source);

  const downloadBlock = download
    ? `
      <p style="line-height:1.6;margin-top:24px;">
        Your download is ready:
      </p>
      <p style="margin:16px 0;">
        <a href="${download.url}"
           style="display:inline-block;background:#c9a961;color:#1f2230;padding:12px 24px;text-decoration:none;font-weight:700;border-radius:4px;">
          Download ${download.label} &rarr;
        </a>
      </p>
      <p style="line-height:1.6;font-size:13px;color:#5b5f70;">
        If the button doesn't work, copy this link:<br />
        <a href="${download.url}" style="color:#5b5f70;">${download.url}</a>
      </p>
    `
    : '';

  await t.sendMail({
    from: process.env.MAIL_FROM,
    to: lead.email,
    subject: 'We received your request — Macacy Consulting',
    html: `
      <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;color:#2d3142;">
        <h2 style="color:#2d3142;">Thank you, ${firstName}.</h2>
        <p style="line-height:1.6;">
          We have received your request. A procurement consultant will reply within 4 business hours.
        </p>
        ${downloadBlock}
        <p style="line-height:1.6;margin-top:24px;">
          If your import is within 90 days, we will recommend a pre-import verification call. If it is further out, we will send the checklist and stay in touch.
        </p>
        <p style="line-height:1.6;">
          Reply to this email or message us on WhatsApp: <a href="https://wa.me/2347039172842" style="color:#c9a961;">+234 703 917 2842</a>
        </p>
        <hr style="border:none;border-top:1px solid #e3e0d8;margin:24px 0;" />
        <p style="font-size:12px;color:#5b5f70;">
          Macacy Consulting<br />
          Procurement consulting for the African market<br />
          16 Trademore Avenue, Airport Road, Abuja, Nigeria
        </p>
      </div>
    `,
  });
}
