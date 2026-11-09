import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/seo.js';
import RiskCheck from '../components/home/RiskCheck.jsx';
import CostChart from '../components/home/CostChart.jsx';
import CategoryTiles from '../components/home/CategoryTiles.jsx';
import Section from '../components/ui/Section.jsx';
import Button from '../components/ui/Button.jsx';
import { caseFiles } from '../data/caseFiles.js';

export default function Home() {
  usePageMeta({
    title: 'Macacy Consulting | Machinery Import Verification Nigeria',
    description:
      'Start with our 30-second risk check. We source and verify industrial machinery from global markets. Based in Abuja.',
  });

  const proof = caseFiles.slice(0, 3);

  return (
    <>
      <section className="hero-risk">
        <div className="hero-risk__bg" aria-hidden />
        <div className="container">
          <div className="hero-risk__inner">
            <span className="eyebrow">The Risk</span>
            <RiskCheck />
          </div>
        </div>
        <style>{`
          .hero-risk { position: relative; padding: var(--s-7) 0; color: #fff; overflow: hidden; }
          .hero-risk__bg {
            position: absolute; inset: 0;
            background-image: url(/images/hero/factory-floor.jpg), radial-gradient(1200px 600px at 80% 20%, #3a3f52 0%, #1f2230 60%), linear-gradient(160deg, #2d3142 0%, #1f2230 100%);
            background-size: cover, auto, auto;
            background-position: center, center, center;
          }
          .hero-risk__inner {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: var(--s-3);
            max-width: 720px;
            margin: 0 auto;
          }
        `}</style>
      </section>

      <Section>
        <div className="core">
          <div className="core__text">
            <span className="eyebrow">The Position</span>
            <h2>Wrong voltage and missing parts? You find out after you paid. We find out before.</h2>
            <div className="stat-grid">
              <div className="stat">
                <div className="stat__num">N4.25T</div>
                <p className="stat__desc">
                  Nigeria&rsquo;s imports of machinery and transport equipment in Q3 2025, 26% of all imports.
                  <em>
                    Source:{' '}
                    <a href="https://microdata.nigerianstat.gov.ng/index.php/catalog/84/study-description" target="_blank" rel="noopener">
                      National Bureau of Statistics (NBS)
                    </a>
                    ,{' '}
                    <a href="https://www.thecable.ng/nbs-nigeria-recorded-n6trn-trade-surplus-in-q3-india-spain-top-export-destinations/" target="_blank" rel="noopener">
                      Foreign Trade Report Q3 2025
                    </a>
                    .
                  </em>
                </p>
              </div>
              <div className="stat">
                <div className="stat__num">100%</div>
                <p className="stat__desc">
                  Of our documented case files trace back to a missing pre-import verification check.
                  <em><strong>Based on Macacy case files.</strong></em>
                </p>
              </div>
            </div>
          </div>
          <div className="core__chart"><CostChart /></div>
        </div>
        <style>{`
          .core { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: var(--s-5); align-items: start; }
          .core h2 { margin: var(--s-2) 0 var(--s-4); }
          .stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--s-3); }
          .stat { background: var(--bg-alt); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--s-3); }
          .stat__num { font-family: var(--font-display); font-size: 2.4rem; font-weight: 800; color: var(--slate); line-height: 1; }
          .stat__desc { margin-top: var(--s-2); font-size: 0.9rem; }
          .stat__desc em { display: block; margin-top: 0.5rem; font-size: 0.75rem; color: var(--text-muted); font-style: normal; }
          .stat__desc a { color: var(--slate); text-decoration: underline; text-underline-offset: 2px; }
          .stat__desc a:hover { color: var(--gold); }
          @media (max-width: 900px) { .core { grid-template-columns: 1fr; } .stat-grid { grid-template-columns: 1fr; } }
        `}</style>
      </Section>

      <Section tight>
        <span className="eyebrow">Scope</span>
        <h2 style={{ margin: 'var(--s-1) 0 var(--s-4)' }}>What We Source.</h2>
        <CategoryTiles />
        <div style={{ marginTop: 'var(--s-4)' }}>
          <Button to="/what-we-source" variant="ghost">See all 13 categories &rarr;</Button>
        </div>
      </Section>

      <Section dark>
        <span className="eyebrow">The Cost of Missing Verification</span>
        <h2 style={{ color: '#fff', margin: 'var(--s-1) 0 var(--s-4)' }}>
          The cost of missing verification.
        </h2>
        <div className="proof-grid">
          {proof.map((c) => (
            <Link to={`/proof-files/${c.slug}`} key={c.slug} className="proof-card">
              <div className="proof-card__num">{c.costLabel}</div>
              <div className="proof-card__line">{c.summary}</div>
              <div className="proof-card__meta">
                Case File {c.n} <span aria-hidden>&rarr;</span>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ marginTop: 'var(--s-4)' }}>
          <Button to="/proof-files#case-files" variant="gold">Read the Evidence &rarr;</Button>
        </div>
        <style>{`
          .proof-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--s-3); }
          .proof-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.12); border-radius: var(--r-md); padding: var(--s-3); transition: border-color 0.2s, transform 0.2s var(--ease); }
          .proof-card:hover { border-color: var(--gold); transform: translateY(-3px); }
          .proof-card__num { font-family: var(--font-display); font-size: 2rem; font-weight: 800; color: var(--red-soft); line-height: 1; }
          .proof-card__line { color: rgba(255,255,255,0.9); margin: var(--s-2) 0; font-size: 1rem; }
          .proof-card__meta { color: var(--gold); font-size: 0.82rem; font-weight: 600; letter-spacing: 0.04em; }
          @media (max-width: 820px) { .proof-grid { grid-template-columns: 1fr; } }
        `}</style>
      </Section>

      <Section>
        <span className="eyebrow">The Method</span>
        <h2 style={{ margin: 'var(--s-1) 0 var(--s-4)' }}>From global market to running machine.</h2>
        <div className="svd">
          {[
            { t: 'Source', d: 'Shortlist vetted makers worldwide.', href: '/services#source', icon: '/icons/source.svg' },
            { t: 'Verify', d: 'Check the spec before you pay.', href: '/services#verify', icon: '/icons/verify.svg' },
            { t: 'Deliver', d: 'Ship, clear, install, hand over.', href: '/services#deliver', icon: '/icons/deliver.svg' },
          ].map((b) => (
            <Link key={b.t} to={b.href} className="svd__block">
              <img src={b.icon} alt="" className="svd__icon" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              <span className="svd__t">{b.t}</span>
              <span className="svd__d">{b.d}</span>
              <span className="svd__a" aria-hidden>&rarr;</span>
            </Link>
          ))}
        </div>
        <style>{`
          .svd { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--s-3); }
          .svd__block { display: flex; flex-direction: column; gap: 0.5rem; background: var(--bg-alt); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--s-4); transition: background 0.2s, border-color 0.2s; }
          .svd__block:hover { border-color: var(--gold); }
          .svd__icon { display: block; height: 140px; width: auto; margin-bottom: var(--s-2); } .svd__t { font-family: var(--font-display); font-size: 1.6rem; font-weight: 700; color: var(--slate); }
          .svd__d { color: var(--text-muted); }
          .svd__a { margin-top: auto; color: var(--gold); font-weight: 700; }
          @media (max-width: 820px) { .svd { grid-template-columns: 1fr; } }
        `}</style>
      </Section>
    </>
  );
}







