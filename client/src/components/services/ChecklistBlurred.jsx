import { useState } from 'react';
import { checklistGroups, blurPlaceholders } from '../../data/checklist.js';
import { api } from '../../lib/api.js';
export default function ChecklistBlurred() {
  const [unlocked, setUnlocked] = useState(false);
  const [showGate, setShowGate] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', whatsapp: '' });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  async function submit(e) {
    e.preventDefault(); setBusy(true); setMsg('');
    try {
      await api.submitLeadGate({ ...form, source: '48-point-checklist' });
      setUnlocked(true); setShowGate(false); setMsg('Sent. Check your inbox for the full checklist.');
    } catch { setMsg('Something went wrong. Please try again or email hello@macacy.com.'); }
    finally { setBusy(false); }
  }
  return (
    <div className="cl">
      <div className="cl-grid">
        {checklistGroups.map((g) => (
          <div key={g.id} className="cl-group">
            <h3 className="cl-group__title">{g.title}</h3>
            <ol className="cl-points">
              {g.points.map((p) => (
                <li key={p.n} className={`cl-point ${p.star ? '' : 'is-blurred'}`}>
                  <span className="cl-point__n">{String(p.n).padStart(2, '0')}</span>
                  <span className="cl-point__text">{p.star ? p.title : blurPlaceholders[p.n % blurPlaceholders.length]}</span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
      {!unlocked && (
        <div className="cl-overlay">
          <button className="btn btn--gold" onClick={() => setShowGate(true)}>Unlock all 48 points</button>
          <p className="cl-overlay__sub">Enter your details and we will send the full checklist PDF.</p>
        </div>
      )}
      {showGate && (
        <div className="cl-modal" role="dialog" aria-modal="true">
          <form className="cl-modal__card" onSubmit={submit}>
            <h3>Get the full checklist</h3>
            <label>Name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
            <label>WhatsApp<input required value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} /></label>
            <label>Email<input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
            {msg && <p className="cl-modal__msg">{msg}</p>}
            <div className="cl-modal__actions">
              <button className="btn btn--gold" disabled={busy}>{busy ? 'Sending...' : 'Send me the checklist'}</button>
              <button type="button" className="btn btn--ghost" onClick={() => setShowGate(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
      <style>{`
        .cl { position: relative; }
        .cl-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--s-3); }
        .cl-group { background: #fff; border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--s-3); transition: transform 0.25s var(--ease), border-color 0.25s var(--ease), box-shadow 0.25s var(--ease); will-change: transform; position: relative; } .cl-group:hover { border-color: var(--gold); transform: scale(1.06); box-shadow: 0 0 0 2px var(--gold), 0 14px 34px rgba(201,169,97,0.28); z-index: 2; }
        .cl-group__title { font-size: 1.05rem; margin-bottom: var(--s-2); color: var(--slate); }
        .cl-points { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.55rem; }
        .cl-point { display: flex; gap: 0.6rem; font-size: 0.88rem; color: var(--text-muted); }
        .cl-point__n { color: var(--gold); font-weight: 700; font-family: var(--font-display); min-width: 1.6rem; }
        .cl-point.is-blurred .cl-point__text { filter: blur(4px); user-select: none; background: var(--bg-alt); border-radius: 3px; }
        .cl-overlay { position: relative; display: flex; flex-direction: column; align-items: center; margin-top: var(--s-4); padding: var(--s-3) 0; background: linear-gradient(to bottom, rgba(250,250,247,0) 0%, var(--bg) 100%); }
        .cl-overlay__sub { margin-top: var(--s-2); font-size: 0.85rem; color: var(--text-muted); }
        .cl-modal { position: fixed; inset: 0; z-index: 100; display: grid; place-items: center; background: rgba(31,34,48,0.5); padding: var(--s-3); }
        .cl-modal__card { background: #fff; border-radius: var(--r-lg); padding: var(--s-4); width: min(440px, 100%); display: flex; flex-direction: column; gap: var(--s-2); }
        .cl-modal__card label { display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.85rem; font-weight: 600; }
        .cl-modal__card input { padding: 0.7rem; border: 1px solid var(--border); border-radius: var(--r-sm); font: inherit; }
        .cl-modal__actions { display: flex; gap: var(--s-2); margin-top: var(--s-2); }
        .cl-modal__msg { font-size: 0.85rem; color: var(--gold); }
        @media (max-width: 900px) { .cl-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 600px) { .cl-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}






