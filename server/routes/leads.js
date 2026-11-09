import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import { appendLead } from '../db.js';
import { sendLeadNotification, sendVisitorConfirmation } from '../services/email.js';

const router = Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Try again in 15 minutes.' },
});

router.post('/', limiter, async (req, res) => {
  const { email, whatsapp, name, source } = req.body || {};
  if (!email && !whatsapp) {
    return res.status(400).json({ error: 'Email or WhatsApp required.' });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }
  const lead = { email, whatsapp, name, source: source || 'lead-gate' };
  appendLead(lead);
  try {
    await sendLeadNotification(lead);
  } catch (err) {
    console.error('Lead notification failed:', err.message);
  }
  try {
    await sendVisitorConfirmation(lead);
  } catch (err) {
    console.error('Visitor confirmation failed:', err.message);
  }
  res.json({ ok: true });
});

export default router;
