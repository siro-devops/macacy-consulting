import { useParams, Link, Navigate } from 'react-router-dom';
import { usePageMeta } from '../lib/seo.js';
import Section from '../components/ui/Section.jsx';
import Button from '../components/ui/Button.jsx';
import { caseFiles } from '../data/caseFiles.js';
import { checklistGroups } from '../data/checklist.js';
function pointName(n) {
  for (const g of checklistGroups) { const p = g.points.find((p) => p.n === n); if (p) return p.title; }
  return '';
}
export default function CaseFile() {
  const { slug } = useParams();
  const file = caseFiles.find((c) => c.slug === slug);
  usePageMeta(file ? { title: `${file.title} | Proof Files | Macacy Consulting`, description: `${file.costLabel} - ${file.summary}` } : {});
  if (!file) return <Navigate to="/proof-files" replace />;
  return (
    <>
      <Section dark>
        <div className="breadcrumb"><Link to="/">Home</Link> / <Link to="/proof-files">Proof Files</Link> / Case File {file.n}</div>
        <span className="eyebrow">Case File {file.n}</span>
        <h1 style={{ color: '#fff' }}>{file.title}</h1>
        <div className="cf-meta"><span>{file.industry}</span><span>{file.failureType}</span><span className="cf-meta__cost">{file.costLabel}</span></div>
        <style>{`.breadcrumb { font-size: 0.8rem; color: rgba(255,255,255,0.6); margin-bottom: var(--s-2); } .breadcrumb a:hover { color: var(--gold); } .cf-meta { display: flex; gap: var(--s-2); margin-top: var(--s-2); flex-wrap: wrap; font-size: 0.85rem; } .cf-meta span { color: rgba(255,255,255,0.75); border: 1px solid rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 999px; } .cf-meta__cost { color: var(--gold) !important; border-color: var(--gold) !important; font-weight: 700; }`}</style>
      </Section>
      <Section>
        <div className="cf-cost"><div className="cf-cost__num">{file.costLabel}</div><ul className="cf-cost__list">{file.breakdown.map((b) => (<li key={b.label}><span>{b.label}</span><span>N{b.value.toLocaleString()}</span></li>))}</ul></div>
        <h2 style={{ marginTop: 'var(--s-4)' }}>What happened</h2>
        <p>{file.opening}</p>
        <h2 style={{ marginTop: 'var(--s-4)' }}>What should have happened</h2>
        <ul className="cf-should">{file.shouldHave.map((s, i) => <li key={i}>{s}</li>)}</ul>
        <div className="cf-callout"><strong>Verification point missed:</strong> {file.missedPoints.map((n) => `Point ${n} - ${pointName(n)}`).join('; ')}</div>
        <div className="cf-links"><Button to="/services" variant="ghost">Services</Button><Button to="/resources" variant="ghost">Resources</Button><Button to="/contact">Free Spec Review</Button></div>
        <p style={{ marginTop: 'var(--s-4)' }}><Link to="/proof-files" className="cf-back">&larr; Back to all case files</Link></p>
        <style>{`
          .cf-cost { background: var(--bg-alt); border-radius: var(--r-md); padding: var(--s-3); border: 1px solid var(--border); }
          .cf-cost__num { font-family: var(--font-display); font-size: 2.6rem; font-weight: 800; color: var(--red); }
          .cf-cost__list { list-style: none; margin: var(--s-2) 0 0; padding: 0; }
          .cf-cost__list li { display: flex; justify-content: space-between; padding: 0.4rem 0; border-bottom: 1px dashed var(--border); font-size: 0.9rem; color: var(--text-muted); }
          .cf-cost__list li:last-child { border-bottom: 0; }
          .cf-should { padding-left: 1.2rem; color: var(--text-muted); max-width: 68ch; }
          .cf-callout { margin-top: var(--s-3); padding: var(--s-2) var(--s-3); border-left: 4px solid var(--gold); background: var(--bg-alt); font-size: 0.92rem; color: var(--slate); }
          .cf-links { display: flex; gap: var(--s-2); margin-top: var(--s-4); flex-wrap: wrap; }
          .cf-back { font-size: 0.85rem; color: var(--slate); }
          .cf-back:hover { color: var(--gold); }
        `}</style>
      </Section>
    </>
  );
}