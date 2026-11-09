import { useState } from 'react';

export default function Accordion({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="accordion">
      {items.map((item, i) => (
        <div key={i} className={`acc-item ${open === i ? 'is-open' : ''}`}>
          <button className="acc-trigger" onClick={() => setOpen(open === i ? null : i)}>
            <span>{item.q}</span>
            <span className="acc-icon" aria-hidden>{open === i ? '-' : '+'}</span>
          </button>
          {open === i && <div className="acc-body"><p>{item.a}</p></div>}
        </div>
      ))}
      <style>{`
        .accordion { border-top: 1px solid var(--border); }
        .acc-item { border-bottom: 1px solid var(--border); }
        .acc-trigger { width: 100%; display: flex; justify-content: space-between; align-items: center; gap: var(--s-2); padding: var(--s-3) 0; background: none; border: 0; text-align: left; font-weight: 600; font-size: 1.05rem; color: var(--text); }
        .acc-icon { color: var(--gold); font-size: 1.4rem; line-height: 1; }
        .acc-body { padding-bottom: var(--s-3); }
        .acc-body p { max-width: 68ch; }
      `}</style>
    </div>
  );
}
