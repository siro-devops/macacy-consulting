import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import leadsRouter from './routes/leads.js';
import contactRouter from './routes/contact.js';
import checklistRouter from './routes/checklist.js';
import casefilesRouter from './routes/casefiles.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendPath = path.join(__dirname, 'public');

const app = express();

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  process.env.PUBLIC_SITE_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: false,
}));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));
app.set('trust proxy', 1);

// API routes FIRST
app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/leads', leadsRouter);
app.use('/api/contact', contactRouter);
app.use('/api/checklist', checklistRouter);
app.use('/api/casefiles', casefilesRouter);
app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found' }));

// Static frontend
app.use(express.static(frontendPath));

// SPA fallback — after API routes
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Error handler
app.use((err, _req, res, _next) => {
  console.error('Server error:', err.message);
  const isDev = process.env.NODE_ENV !== 'production';
  res.status(500).json({
    error: 'Server error',
    ...(isDev ? { detail: err.message } : {}),
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Macacy API listening on :${PORT}`));