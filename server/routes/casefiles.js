import { Router } from 'express';
const router = Router();
router.get('/', (_req, res) => { res.json({ count: 8, note: 'Case file content is served from the client data module.' }); });
export default router;