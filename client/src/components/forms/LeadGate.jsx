import { useState } from 'react';
import { api } from '../../lib/api.js';
export default function LeadGate({ title, blurb, source }) {
  const [form, setForm] = useState({ name: '', email: '', whatsapp: '' });
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState('');
  async function submit(e) {
    e.preventDefault(); setBusy(true); setErr('');
    try { await api.submitLeadGate({ ...form, source }); setSent(true); }
    catch { setErr('Something went wrong. Please try again or email hello@macacy.com.'); }
    finally { setBusy(false); }
  }
  return (
    <div className="lg">
      <h3>{title}</h3>
      <p>{blurb}</p>
      {!sent ? (
        <form onSubmit={submit} className="lg__form">
          <input required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input required placeholder="WhatsApp number" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} />
          <input type="email" required placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <button className="btn btn--gold" disabled={busy}>{busy ? 'Sending...' : 'Send me the download'}</button>
          {err && <p className="lg__err">{err}</p>}
        </form>
      ) : (<p className="lg__ok">Sent. Check your inbox - the download link is on its way.</p>)}
      <style>{`
        .lg { background: #fff; border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--s-3); display: flex; flex-direction: column; gap: 0.6rem; }
        .lg h3 { color: var(--slate); }
        .lg p { font-size: 0.9rem; }
        .lg__form { display: flex; flex-direction: column; gap: 0.55rem; margin-top: var(--s-1); }
        .lg__form input { padding: 0.65rem; border: 1px solid var(--border); border-radius: var(--r-sm); font: inherit; font-size: 0.9rem; }
        .lg__ok { color: var(--gold); font-weight: 600; }
        .lg__err { color: var(--red); font-size: 0.82rem; }
      `}</style>
    </div>
  );
}
