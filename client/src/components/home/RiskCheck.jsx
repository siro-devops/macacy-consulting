import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const WA_NUMBER = '2347039172842';

function WaButton({ label, message, variant = 'gold' }) {
  const href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
  return (
    <a className={`btn btn--${variant}`} href={href} target="_blank" rel="noopener">
      {label}
    </a>
  );
}

function track(_evt) {}

const STEPS = [
  {
    q: 'What power does your factory run on?',
    options: [
      { label: '230V single-phase', value: '230V' },
      { label: '415V three-phase', value: '415V' },
      { label: 'Not sure', value: 'unsure' },
    ],
  },
  {
    q: "Does the supplier's spec sheet confirm that voltage and phase, in writing?",
    options: [
      { label: 'Yes, in writing', value: 'yes' },
      { label: 'Only verbally', value: 'verbal' },
      { label: "I haven't asked", value: 'notasked' },
    ],
  },
  {
    q: 'Will someone qualified inspect the machine running, before you pay?',
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
      { label: 'Not sure', value: 'unsure' },
    ],
  },
];

const WEAK = new Set(['verbal', 'notasked', 'no', 'unsure']);

export default function RiskCheck() {
  const [state, setState] = useState('start');
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    track('risk_check_started');
  }, []);

  const go = (next, evt) => {
    if (evt) track(evt);
    setState(next);
  };

  const advance = (next, evt) => {
    if (evt) track(evt);
    setTimeout(() => setState(next), 240);
  };

  const d = (s) => ({ '--d': `${s}s` });

  const isHighRisk =
    Object.values(answers).some((v) => WEAK.has(v)) || answers[0] === 'unsure';

  function pickStep(step, value) {
    const next = { ...answers, [step]: value };
    setAnswers(next);
    if (step === 0) {
      if (value === 'unsure') { advance('s1a', 'risk_check_path_unsure'); return; }
      advance('s2', value === '415V' ? 'risk_check_path_415v' : 'risk_check_path_230v');
      return;
    }
    if (step === 1) { advance('s3'); return; }
    if (step === 2) {
      const high = Object.values(next).some((v) => WEAK.has(v)) || next[0] === 'unsure';
      advance(high ? 'high' : 'good');
    }
  }

  function highRiskCopy() {
    if (answers[0] === '415V')
      return "A machine built for 380V or 400V and run on 415V can burn out its motor and control panel within weeks. Send us your spec and we'll check it.";
    if (answers[0] === '230V')
      return "Most industrial machines need three-phase power. On single-phase, many won't run at full capacity without a converter. Let's check your machine before you buy.";
    return "If you don't know your supply, your supplier can't match it either. That's the first red flag. We start there.";
  }

  const stepIndex =
    state === 'start' ? 0 :
    state === 's1a' ? 0 :
    state === 's2' ? 1 :
    state === 's3' ? 2 :
    2;

  const isResult = state === 'high' || state === 'good' || state === 's1a';

  function Arrow() {
    return (
      <div className="risk-arrow fade" style={d(0.55)} aria-hidden>
        <svg viewBox="0 0 24 44" width="24" height="44">
          <line
            x1="12" y1="0" x2="12" y2="30"
            stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round"
            className="risk-arrow__line"
          />
          <path
            d="M5 30 L12 40 L19 30"
            stroke="var(--gold)" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" fill="none"
            className="risk-arrow__head"
          />
        </svg>
      </div>
    );
  }

  function renderOptions(stepIdx) {
    return (
      <div className="btn-row fade" style={d(0.9)}>
        {STEPS[stepIdx].options.map((o) => {
          const selected = answers[stepIdx] === o.value;
          return (
            <button
              key={o.value}
              className={`btn btn--ghost-light ${selected ? 'is-selected' : ''}`}
              onClick={() => pickStep(stepIdx, o.value)}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <section className="risk" aria-live="polite">
      <div key={state} className="risk-in">

        {!isResult && (
          <>
            <div className="risk-progress fade" style={d(0)} aria-hidden>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`risk-dot ${i < stepIndex ? 'is-done' : i === stepIndex ? 'is-active' : ''}`}
                />
              ))}
            </div>
            <div className="risk-step fade" style={d(0.15)}>
              Step {stepIndex + 1} of 3
            </div>
          </>
        )}

        {state === 'start' && (
          <>
            <h1 className="risk-display risk-display--hero fade" style={d(0.3)}>
              {STEPS[0].q}
            </h1>
            <Arrow />
            {renderOptions(0)}
            <p className="risk-hint fade" style={d(1.4)}>
              Take the 30-second risk check. No email required.
            </p>
          </>
        )}

        {state === 's1a' && (
          <>
            <p className="risk-display sm fade" style={d(0)}>
              This is the number one reason machinery from China fails in Nigeria.
            </p>
            <p className="risk-lead fade" style={d(1.6)}>
              It is not the supplier. The factory is real and the machine works.
            </p>
            <p className="risk-lead fade" style={d(3.2)}>
              The problem is the grid. And nobody asked that question.
            </p>
            <span className="draw" style={d(4.6)} aria-hidden />
            <p className="risk-lead fade" style={d(5.6)}>
              We verify this and 47 other points before your deposit leaves the country.
            </p>
            <div className="fade" style={d(6.6)}>
              <WaButton
                label="Send us your machine specs"
                message="Hi Macacy, I don't know my facility's voltage and phase. I'd like to send you my machine specs."
              />
            </div>
            <div className="fade" style={d(7.4)}>
              <Link className="btn btn--ghost-light" to="/services">
                See the full verification list
              </Link>
            </div>
          </>
        )}

        {state === 's2' && (
          <>
            <h2 className="risk-display sm fade" style={d(0)}>{STEPS[1].q}</h2>
            <Arrow />
            {renderOptions(1)}
            <p className="risk-hint fade" style={d(1.4)}>
              Take the 30-second risk check. No email required.
            </p>
          </>
        )}

        {state === 's3' && (
          <>
            <h2 className="risk-display sm fade" style={d(0)}>{STEPS[2].q}</h2>
            <Arrow />
            {renderOptions(2)}
            <p className="risk-hint fade" style={d(1.4)}>
              Take the 30-second risk check. No email required.
            </p>
          </>
        )}

        {state === 'high' && (
          <>
            <span className="risk-result is-high fade" style={d(0)}>High risk</span>
            <p className="risk-lead fade" style={d(0.5)}>{highRiskCopy()}</p>
            <span className="draw" style={d(1.6)} aria-hidden />
            <div className="fade" style={d(2.4)}>
              <Link className="btn btn--gold" to="/contact" state={{ riskAnswers: answers }}>
                Free Spec Review
              </Link>
            </div>
            <div className="fade" style={d(3.0)}>
              <WaButton
                label="Send us your spec on WhatsApp"
                message={`Hi Macacy, my risk check came back high. Here are my answers: ${JSON.stringify(answers)}`}
              />
            </div>
          </>
        )}

        {state === 'good' && (
          <>
            <span className="risk-result is-good fade" style={d(0)}>Good start</span>
            <p className="risk-display sm fade" style={d(0.5)}>
              Good start. A second pair of eyes still costs less than a second machine.
            </p>
            <span className="draw" style={d(1.6)} aria-hidden />
            <div className="fade" style={d(2.4)}>
              <Link className="btn btn--gold" to="/services#verify">
                See what we verify
              </Link>
            </div>
          </>
        )}

        {state !== 'start' && (
          <button
            className="risk-reset fade"
            style={d(isResult ? 1.0 : 0.8)}
            onClick={() => { setAnswers({}); setState('start'); }}
          >
            Start over
          </button>
        )}

      </div>

      <style>{`
        .risk { width: 100%; display: flex; justify-content: center; }
        .risk-in {
          width: 100%;
          max-width: 720px;
          color: #fff;
          text-align: center;
        }

        .fade {
          opacity: 0;
          transform: translateY(10px);
          animation: riskFade 0.6s var(--ease) forwards;
          animation-delay: var(--d, 0s);
        }
        @keyframes riskFade { to { opacity: 1; transform: none; } }

        .draw {
          display: block;
          width: 72px;
          height: 2px;
          margin: 0.4rem auto 0.6rem;
          background: var(--gold);
          transform-origin: left center;
          transform: scaleX(0);
          animation: riskDraw 0.9s var(--ease) forwards;
          animation-delay: var(--d, 0s);
        }
        @keyframes riskDraw { to { transform: scaleX(1); } }

        @media (prefers-reduced-motion: reduce) {
          .fade, .draw { animation: none; opacity: 1; transform: none; }
          .risk-arrow__line, .risk-arrow__head { animation: none !important; }
        }

        /* Base question style — used by steps 2 and 3 */
        .risk-display {
          font-family: var(--font-display);
          font-weight: 700;
          color: #fff;
          margin: 0 auto;
          max-width: 30ch;
          font-size: clamp(1.35rem, 2.4vw, 1.9rem);
          line-height: 1.25;
          letter-spacing: -0.005em;
        }
        /* Bigger hero style — only step 1 */
        .risk-display.risk-display--hero {
          font-weight: 800;
          font-size: clamp(2.2rem, 5vw, 4rem);
          line-height: 1.1;
          letter-spacing: -0.01em;
          max-width: 22ch;
        }
        .risk-display.sm {
          font-size: clamp(1.25rem, 2.2vw, 1.6rem);
          font-weight: 700;
        }

        .risk-lead {
          color: rgba(255,255,255,0.85);
          font-size: 1.02rem;
          line-height: 1.6;
          margin: 0 auto var(--s-2);
          max-width: 52ch;
        }

        .risk-arrow {
          display: flex;
          justify-content: center;
          margin: 0.6rem 0 0.4rem;
        }
        .risk-arrow svg { overflow: visible; }
        .risk-arrow__line {
          stroke-dasharray: 30;
          stroke-dashoffset: 30;
          animation: riskLineGrow 0.7s var(--ease) forwards;
          animation-delay: calc(var(--d, 0s) + 0.1s);
        }
        @keyframes riskLineGrow { to { stroke-dashoffset: 0; } }
        .risk-arrow__head {
          opacity: 0;
          animation: riskHeadFade 0.4s var(--ease) forwards,
                     riskHeadPulse 1.6s ease-in-out 0.8s infinite;
          animation-delay: calc(var(--d, 0s) + 0.7s), calc(var(--d, 0s) + 0.9s);
        }
        @keyframes riskHeadFade { to { opacity: 1; } }
        @keyframes riskHeadPulse {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50%      { transform: translateY(4px); opacity: 0.55; }
        }

        .risk-progress {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-bottom: var(--s-2);
        }
        .risk-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          transition: background 0.3s var(--ease), transform 0.3s var(--ease);
        }
        .risk-dot.is-done { background: rgba(201,169,97,0.5); }
        .risk-dot.is-active {
          background: var(--gold);
          transform: scale(1.4);
          box-shadow: 0 0 0 4px rgba(201,169,97,0.18);
        }

        .risk-step {
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 600;
          margin-bottom: var(--s-2);
        }

        .btn-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: var(--s-2);
          margin-top: var(--s-2);
        }
        .btn-row .btn { min-width: 160px; }

        .btn--ghost-light.is-selected {
          background: var(--gold);
          border-color: var(--gold);
          color: var(--slate-deep);
          font-weight: 700;
        }

        .risk-hint {
          color: rgba(255,255,255,0.6);
          font-size: 0.85rem;
          margin: var(--s-3) auto 0;
          max-width: 46ch;
        }

        .risk-result {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 999px;
          margin-bottom: var(--s-3);
        }
        .risk-result.is-high { background: rgba(178,58,47,0.25); color: #ffb4ab; }
        .risk-result.is-good { background: rgba(201,169,97,0.22); color: var(--gold-bright); }

        .risk-reset {
          display: block;
          margin: var(--s-3) auto 0;
          background: none;
          border: 0;
          padding: 0;
          color: var(--gold);
          font-size: 0.85rem;
          text-decoration: underline;
        }
      `}</style>
    </section>
  );
}
