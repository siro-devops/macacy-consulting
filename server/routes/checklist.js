import { Router } from 'express';
const router = Router();
router.get('/', (_req, res) => { res.json({ version: '2026.10', points: 48, note: 'Full checklist content is served from the client data module.' }); });
export default router;