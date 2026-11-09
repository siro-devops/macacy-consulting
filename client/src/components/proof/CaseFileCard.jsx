import { Link } from 'react-router-dom';
export default function CaseFileCard({ file }) {
  return (
    <Link to={`/proof-files/${file.slug}`} className="cfc">
      <div className="cfc__num">{file.costLabel}</div>
      <div className="cfc__meta">Case File {file.n}</div>
      <h3 className="cfc__title">{file.title}</h3>
      <p className="cfc__sum">{file.summary}</p>
      <span className="cfc__link">Read case file &rarr;</span>
      <style>{`
        .cfc { display: flex; flex-direction: column; gap: 0.5rem; background: #fff; border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--s-3); transition: border-color 0.2s, transform 0.2s var(--ease); }
        .cfc:hover { border-color: var(--gold); transform: translateY(-3px); }
        .cfc__num { font-family: var(--font-display); font-size: 1.9rem; font-weight: 800; color: var(--red); line-height: 1; }
        .cfc__meta { font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-muted); font-weight: 600; }
        .cfc__title { font-size: 1.05rem; margin: 0.2rem 0; }
        .cfc__sum { font-size: 0.9rem; }
        .cfc__link { margin-top: auto; padding-top: var(--s-2); color: var(--slate); font-weight: 600; font-size: 0.85rem; }
      `}</style>
    </Link>
  );
}