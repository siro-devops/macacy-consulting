import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import { appendLead } from '../db.js';
import { sendLeadNotification, sendVisitorConfirmation } from '../services/email.js';

const router = Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Try again in 15 minutes.' },
});

router.post('/', limiter, async (req, res) => {
  const { category, stage, name, whatsapp, email, riskAnswers } = req.body || {};
  if (!name || (!whatsapp && !email)) {
    return res.status(400).json({ error: 'Name and contact required.' });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }
  const lead = { name, whatsapp, email, category, stage, riskAnswers, source: 'contact-form' };
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
