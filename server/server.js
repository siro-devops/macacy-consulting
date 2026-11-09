import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import leadsRouter from './routes/leads.js';
import contactRouter from './routes/contact.js';
import checklistRouter from './routes/checklist.js';
import casefilesRouter from './routes/casefiles.js';

const app = express();

// Security headers
app.use(helmet({
  contentSecurityPolicy: false, // Vite dev needs this off; enable in production behind a real domain
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

// Restrict CORS to known origins
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  process.env.PUBLIC_SITE_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (server-to-server, curl, health checks)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: false,
}));

// Tight body limits — lead forms don't need more
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));

// Trust proxy (needed if deployed behind nginx/Cloudflare for rate-limit accuracy)
app.set('trust proxy', 1);

// Health check
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// Routes
app.use('/api/leads', leadsRouter);
app.use('/api/contact', contactRouter);
app.use('/api/checklist', checklistRouter);
app.use('/api/casefiles', casefilesRouter);

// 404 for unknown API routes
app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found' }));

// Global error handler
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
