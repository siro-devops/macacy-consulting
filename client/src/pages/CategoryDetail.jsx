import { useParams, Link, Navigate } from 'react-router-dom';
import { usePageMeta } from '../lib/seo.js';
import Section from '../components/ui/Section.jsx';
import Button from '../components/ui/Button.jsx';
import { categories } from '../data/categories.js';

export default function CategoryDetail() {
  const { slug } = useParams();
  const category = categories.find((c) => c.slug === slug);

  usePageMeta(
    category
      ? {
          title: `${category.name} | What We Source | Macacy Consulting`,
          description: `${category.check} Sourced globally, verified before you pay.`,
        }
      : {}
  );

  if (!category) return <Navigate to="/what-we-source" replace />;

  const d = category.detail;

  return (
    <>
      <Section dark>
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/what-we-source">What We Source</Link> / {category.name}
        </div>
        <span className="eyebrow">Category</span>
        <h1 style={{ color: '#fff' }}>{category.name}</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: 'var(--s-2)' }}>{category.check}</p>
        <style>{`
          .breadcrumb { font-size: 0.8rem; color: rgba(255,255,255,0.6); margin-bottom: var(--s-2); }
          .breadcrumb a:hover { color: var(--gold); }
        `}</style>
      </Section>

      <Section>
        <h2>Detail</h2>
        <div className="detail-table">
          <div className="detail-row">
            <div className="detail-key">Typical capacity range</div>
            <div className="detail-val">{d.capacity}</div>
          </div>
          <div className="detail-row">
            <div className="detail-key">Power requirement</div>
            <div className="detail-val">{d.power}</div>
          </div>
          <div className="detail-row">
            <div className="detail-key">Strong origins</div>
            <div className="detail-val">{d.origins}</div>
          </div>
          <div className="detail-row">
            <div className="detail-key">Top 3 checks</div>
            <div className="detail-val">
              <ol style={{ margin: 0, paddingLeft: '1.2rem' }}>
                {d.topChecks.map((c, i) => <li key={i}>{c}</li>)}
              </ol>
            </div>
          </div>
          <div className="detail-row">
            <div className="detail-key">Most common failure</div>
            <div className="detail-val">{d.failure}</div>
          </div>
          <div className="detail-row">
            <div className="detail-key">Typical lead time</div>
            <div className="detail-val">{d.leadTime}</div>
          </div>
        </div>

        <div style={{ marginTop: 'var(--s-5)' }}>
          <h2>Equipment we source in this category</h2>
          <ul className="detail-equipment">
            {category.equipment.map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        </div>

        <div className="detail-actions">
          <Button to="/contact">Free Spec Review</Button>
          <Link to="/what-we-source" className="detail-back">&larr; Back to What We Source</Link>
        </div>

        <style>{`
          .detail-table {
            border: 1px solid var(--border);
            border-radius: var(--r-md);
            overflow: hidden;
            background: #fff;
          }
          .detail-row {
            display: grid;
            grid-template-columns: 240px 1fr;
            border-bottom: 1px solid var(--border);
          }
          .detail-row:last-child { border-bottom: 0; }
          .detail-key {
            padding: var(--s-2) var(--s-3);
            background: var(--bg-alt);
            font-weight: 700;
            font-size: 0.85rem;
            color: var(--slate);
            letter-spacing: 0.02em;
          }
          .detail-val {
            padding: var(--s-2) var(--s-3);
            font-size: 0.95rem;
            color: var(--text);
          }
          .detail-equipment {
            margin-top: var(--s-2);
            padding-left: 1.2rem;
            color: var(--text-muted);
          }
          .detail-equipment li { margin: 0.4rem 0; }
          .detail-actions {
            margin-top: var(--s-5);
            display: flex;
            gap: var(--s-3);
            align-items: center;
            flex-wrap: wrap;
          }
          .detail-back {
            font-size: 0.85rem;
            color: var(--slate);
          }
          .detail-back:hover { color: var(--gold); }
          @media (max-width: 720px) {
            .detail-row { grid-template-columns: 1fr; }
            .detail-key { padding-bottom: 0; background: transparent; }
          }
        `}</style>
      </Section>
    </>
  );
}
