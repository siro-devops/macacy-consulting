const steps = [
  { n: '01', t: 'Discover', d: "We learn what you make, your facility's power setup, and what the machine must do." },
  { n: '02', t: 'Shortlist', d: 'We identify and vet 3 to 5 global suppliers who can build to your verified specification.' },
  { n: '03', t: 'Verify', d: 'We check every compatibility point before you pay.' },
  { n: '04', t: 'Test', d: 'Our own team witnesses the machine running at the factory before it ships.' },
  { n: '05', t: 'Ship & Clear', d: 'We oversee freight, customs clearance and port documentation.' },
  { n: '06', t: 'Deliver', d: 'We support installation and commissioning until the machine is operational.' },
];
export default function StepsGrid() {
  return (
    <div className="steps">
      {steps.map((s) => (
        <article key={s.n} className="step">
          <span className="step__n">{s.n}</span>
          <h3 className="step__t">{s.t}</h3>
          <p className="step__d">{s.d}</p>
        </article>
      ))}
      <style>{`
        .steps { display: grid; grid-template-columns: repeat(6, 1fr); gap: var(--s-2); }
        .step { position: relative; background: var(--slate); color: #fff; border: 1px solid var(--slate-soft); border-radius: var(--r-md); padding: var(--s-3) var(--s-2) var(--s-3) var(--s-3); transition: transform 0.2s var(--ease), box-shadow 0.2s var(--ease); overflow: hidden; }
        .step::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: var(--gold); }
        .step { will-change: transform; } .step:hover { transform: translateY(-4px) scale(1.06); box-shadow: 0 0 0 2px var(--gold), 0 14px 34px rgba(201,169,97,0.28); }
        .step__n { font-family: var(--font-display); color: var(--gold); font-weight: 800; font-size: 1.3rem; }
        .step__t { color: #fff; margin: 0.4rem 0; font-size: 1.05rem; }
        .step__d { color: rgba(255,255,255,0.7); font-size: 0.84rem; line-height: 1.5; }
        @media (max-width: 1024px) { .steps { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 640px) {
          .steps { grid-template-columns: 1fr; }
          .step::before { left: 0; right: 0; top: 0; bottom: auto; height: 4px; width: auto; }
          .step:hover { transform: none; }
        }
      `}</style>
    </div>
  );
}
