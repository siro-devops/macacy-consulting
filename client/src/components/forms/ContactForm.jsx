import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../../lib/api.js';
import { categories } from '../../data/categories.js';

const WA_NUMBER = '2347039172842';
const STAGES = ['Considering', 'Have a quote', 'Ordered', 'Shipped'];

export default function ContactForm() {
  const { state } = useLocation();
  const riskAnswers = state?.riskAnswers || null;

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ category: '', stage: '', name: '', whatsapp: '', email: '' });
  const [selected, setSelected] = useState({});
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState('');

  const d = (s) => ({ '--d': `${s}s` });

  function pickCategory(value) {
    setForm({ ...form, category: value });
    setSelected({ ...selected, 0: value });
    setTimeout(() => setStep(1), 240);
  }

  function pickStage(value) {
    setForm({ ...form, stage: value });
    setSelected({ ...selected, 1: value });
    setTimeout(() => setStep(2), 240);
  }

  function restart() {
    setStep(0);
    setSelected({});
    setForm({ category: '', stage: '', name: '', whatsapp: '', email: '' });
    setSent(false);
    setErr('');
  }

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setErr('');
    try {
      await api.submitContact({ ...form, riskAnswers });
      setSent(true);
    } catch {
      setErr('Something went wrong. Please try again or email hello@macacy.com.');
    } finally {
      setBusy(false);
    }
  }

  const waPrefilled = () => {
    const parts = ["Hi Macacy, I'd like a Pre-Import Verification Call."];
    if (form.category) parts.push(`Importing: ${form.category}`);
    if (form.stage) parts.push(`Stage: ${form.stage}`);
    if (riskAnswers) parts.push(`Risk check: ${JSON.stringify(riskAnswers)}`);
    return encodeURIComponent(parts.join(' - '));
  };

  if (sent) {
    return (
      <div className="cf-success fade" style={d(0)}>
        <h3>Thank you. We will reply shortly.</h3>
        <p>We respond within 4 business hours.</p>
        <a
          className="btn btn--gold"
          href={`https://wa.me/${WA_NUMBER}?text=${waPrefilled()}`}
          target="_blank"
          rel="noopener"
        >
          Message Macacy Consulting on WhatsApp
        </a>
        <button type="button" className="cf-restart" onClick={restart}>
          Send another request
        </button>
      </div>
    );
  }

  return (
    <div className="cf-wrap">
      <div key={step} className="cf-inner">
        {/* Progress dots */}
        <div className="cf-progress" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`cf-dot ${i < step ? 'is-done' : i === step ? 'is-active' : ''}`}
            />
          ))}
        </div>
        <div className="cf-step-label fade" style={d(0.1)}>
          Step {step + 1} of 3
        </div>

        {step === 0 && (
          <div className="cf-body">
            <h2 className="cf-q fade" style={d(0.2)}>What are you importing?</h2>
            <div className="cf-arrow" aria-hidden>
              <svg viewBox="0 0 24 32" width="24" height="32">
                <line
                  x1="12" y1="0" x2="12" y2="22"
                  stroke="var(--gold)" strokeWidth="2" strokeLinecap="round"
                  className="cf-arrow__line"
                />
                <path
                  d="M5 22 L12 30 L19 22"
                  stroke="var(--gold)" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" fill="none"
                  className="cf-arrow__head"
                />
              </svg>
            </div>
            <div className="cf-dropdown-wrap fade" style={d(0.5)}>
              <label className="cf-dropdown-label">
                Select a category
                <select
                  required
                  value={form.category}
                  onChange={(e) => {
                    setSelected({ ...selected, 0: e.target.value });
                    setForm({ ...form, category: e.target.value });
                  }}
                  className="cf-dropdown"
                >
                  <option value="">— Choose —</option>
                  {categories.map((c) => (
                    <option key={c.slug} value={c.name}>{c.name}</option>
                  ))}
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </label>
              <button
                type="button"
                className="btn btn--gold cf-continue"
                disabled={!form.category}
                onClick={() => pickCategory(form.category)}
              >
                Continue &rarr;
              </button>
            </div>
            <p className="cf-hint fade" style={d(0.8)}>
              Three questions. Then a conversation on WhatsApp.
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="cf-body">
            <h2 className="cf-q fade" style={d(0.1)}>Where are you in the process?</h2>
            <div className="cf-arrow" aria-hidden>
              <svg viewBox="0 0 24 32" width="24" height="32">
                <line
                  x1="12" y1="0" x2="12" y2="22"
                  stroke="var(--gold)" strokeWidth="2" strokeLinecap="round"
                  className="cf-arrow__line"
                />
                <path
                  d="M5 22 L12 30 L19 22"
                  stroke="var(--gold)" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" fill="none"
                  className="cf-arrow__head"
                />
              </svg>
            </div>
            <div className="cf-options fade" style={d(0.4)}>
              {STAGES.map((s) => (
                <button
                  key={s}
                  className={`btn btn--ghost-light cf-opt ${selected[1] === s ? 'is-selected' : ''}`}
                  onClick={() => pickStage(s)}
                >
                  {s}
                </button>
              ))}
            </div>
            <button className="cf-restart fade" style={d(0.7)} onClick={() => setStep(0)}>
              Start over
            </button>
          </div>
        )}

        {step === 2 && (
          <form className="cf-body" onSubmit={submit}>
            <h2 className="cf-q fade" style={d(0.1)}>How do we reach you?</h2>
            <div className="cf-fields fade" style={d(0.3)}>
              <label>
                Name
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </label>
              <label>
                WhatsApp
                <input required value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} />
              </label>
              <label>
                Email
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </label>
            </div>

            {riskAnswers && (
              <p className="cf-note fade" style={d(0.5)}>
                Your risk-check answers will be sent with this request.
              </p>
            )}

            {err && <p className="cf-err">{err}</p>}

            <div className="cf-submit fade" style={d(0.6)}>
              <button className="btn btn--gold" disabled={busy}>
                {busy ? 'Sending...' : 'Request a Pre-Import Verification Call'}
              </button>
              <button type="button" className="cf-restart" onClick={() => setStep(1)}>
                Back
              </button>
              <button type="button" className="cf-restart" onClick={restart}>
                Start over
              </button>
            </div>
          </form>
        )}
      </div>

      <style>{`
        .cf-wrap {
          width: 100%;
          max-width: 720px;
          margin: 0 auto;
          text-align: center;
        }
        .cf-inner {
          color: var(--text);
        }
        .fade {
          opacity: 0;
          transform: translateY(10px);
          animation: cfFade 0.55s var(--ease) forwards;
          animation-delay: var(--d, 0s);
        }
        @keyframes cfFade { to { opacity: 1; transform: none; } }

        .cf-progress {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-bottom: var(--s-2);
        }
        .cf-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--border);
          transition: background 0.3s var(--ease), transform 0.3s var(--ease);
        }
        .cf-dot.is-done { background: rgba(201,169,97,0.55); }
        .cf-dot.is-active {
          background: var(--gold);
          transform: scale(1.4);
          box-shadow: 0 0 0 4px rgba(201,169,97,0.22);
        }
        .cf-step-label {
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 700;
          margin-bottom: var(--s-3);
        }

        .cf-body { display: flex; flex-direction: column; align-items: center; }
        .cf-q {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          color: var(--text);
          margin: 0 auto var(--s-1);
          max-width: 26ch;
          line-height: 1.2;
        }

        .cf-arrow {
          display: flex;
          justify-content: center;
          margin: 0.4rem auto 0.2rem;
        }
        .cf-arrow__line {
          stroke-dasharray: 22;
          stroke-dashoffset: 22;
          animation: cfLineGrow 0.6s var(--ease) forwards;
          animation-delay: 0.2s;
        }
        @keyframes cfLineGrow { to { stroke-dashoffset: 0; } }
        .cf-arrow__head {
          opacity: 0;
          animation: cfHeadFade 0.4s var(--ease) forwards,
                     cfHeadPulse 1.6s ease-in-out 0.7s infinite;
          animation-delay: 0.6s, 0.9s;
        }
        @keyframes cfHeadFade { to { opacity: 1; } }
        @keyframes cfHeadPulse {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50%      { transform: translateY(3px); opacity: 0.55; }
        }

        .cf-options {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: var(--s-1);
          margin-top: var(--s-2);
          max-width: 640px;
        }
        .cf-opt {
          font-size: 0.85rem;
          padding: 0.6rem 1rem;
          min-width: auto;
          border-color: var(--storm);
          color: var(--text);
          background: #fff;
        }
        .cf-opt:hover { border-color: var(--gold); color: var(--gold); }
        .cf-opt.is-selected {
          background: var(--gold);
          border-color: var(--gold);
          color: var(--slate-deep);
          font-weight: 700;
        }

        .cf-hint {
          color: var(--text-muted);
          font-size: 0.85rem;
          margin: var(--s-3) auto 0;
        }

        .cf-dropdown-wrap {
          width: 100%;
          max-width: 480px;
          margin: var(--s-3) auto 0;
          display: flex;
          flex-direction: column;
          gap: var(--s-2);
          align-items: stretch;
        }
        .cf-dropdown-label {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--slate);
          letter-spacing: 0.03em;
          text-align: left;
        }
        .cf-dropdown {
          padding: 0.8rem 0.9rem;
          border: 1px solid var(--border);
          border-radius: var(--r-sm);
          font: inherit;
          font-size: 0.95rem;
          background: #fff;
          color: var(--text);
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'><path d='M1 1l5 5 5-5' stroke='%23c9a961' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          padding-right: 2.5rem;
        }
        .cf-dropdown:focus {
          outline: 2px solid var(--gold);
          outline-offset: 1px;
          border-color: var(--gold);
        }
        .cf-continue {
          align-self: center;
          min-width: 200px;
        }
        .cf-continue:disabled {
          opacity: 0.45;
          cursor: not-allowed;
          transform: none;
        }

        .cf-fields {
          display: flex;
          flex-direction: column;
          gap: var(--s-2);
          width: 100%;
          max-width: 480px;
          margin: var(--s-3) auto 0;
          text-align: left;
        }
        .cf-fields label {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--slate);
          letter-spacing: 0.03em;
        }
        .cf-fields input {
          padding: 0.75rem 0.9rem;
          border: 1px solid var(--border);
          border-radius: var(--r-sm);
          font: inherit;
          font-size: 0.92rem;
          background: #fff;
        }
        .cf-fields input:focus {
          outline: 2px solid var(--gold);
          outline-offset: 1px;
          border-color: var(--gold);
        }

        .cf-note {
          font-size: 0.82rem;
          color: var(--gold);
          margin-top: var(--s-2);
        }
        .cf-err { font-size: 0.82rem; color: var(--red); margin-top: var(--s-2); }

        .cf-submit {
          display: flex;
          gap: var(--s-2);
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: var(--s-3);
        }

        .cf-restart {
          margin-top: var(--s-3);
          background: none;
          border: 0;
          padding: 0;
          color: var(--gold);
          font-size: 0.85rem;
          text-decoration: underline;
          cursor: pointer;
        }
        .cf-submit .cf-restart { margin-top: 0; }

        .cf-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--s-2);
          padding: var(--s-4);
          background: var(--bg-alt);
          border-radius: var(--r-md);
        }
        .cf-success h3 { color: var(--slate); }

        @media (max-width: 600px) {
          .cf-opt { font-size: 0.8rem; padding: 0.5rem 0.8rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .fade { animation: none; opacity: 1; transform: none; }
          .cf-arrow__line, .cf-arrow__head { animation: none; opacity: 1; }
        }
      `}</style>
    </div>
  );
}

