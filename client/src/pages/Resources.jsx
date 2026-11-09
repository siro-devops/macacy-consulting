import { usePageMeta } from '../lib/seo.js';
import Section from '../components/ui/Section.jsx';
import Button from '../components/ui/Button.jsx';
import Accordion from '../components/ui/Accordion.jsx';
import LeadGate from '../components/forms/LeadGate.jsx';
import { guides } from '../data/guides.js';
import { marketUpdates } from '../data/marketUpdates.js';

const faqs = [
  { q: 'What does it cost?', a: 'Fees depend on the product, the machine and the destination. Spec review, factory inspection and full engagement are quoted separately, in writing, before any work begins. There are no supplier commissions, we work for the buyer only. Message us and we will send a quote that fits your import.' },
  { q: 'How long does it take?', a: 'From engagement to delivery is typically 10 to 15 weeks. We provide a projected timeline at the start of the engagement and update it as the order progresses.' },
  { q: 'What if the machine arrives broken?', a: 'We verify the machine at the factory and defects are corrected before the container is sealed. If a defect appears after delivery, we work with you and the supplier to resolve it. The engagement does not close until the machine is operational.' },
  { q: 'Do you work with small orders?', a: 'We work with orders from $3,000 upwards. For small orders we can refer you to a vetted supplier and provide a specification review as a standalone service.' },
  { q: 'Can you help with clearing?', a: 'We coordinate with your freight forwarder or connect you with a vetted partner. We make sure documentation is complete before the container arrives.' },
  { q: 'What if I already have a supplier?', a: 'We can still work with you. If you already have a supplier, we verify the machine specification against your facility conditions before you pay the deposit.' },
  { q: 'Which countries do you source from?', a: 'We source from Germany, Italy, India, Turkey, the USA, China, the Netherlands, the United Arab Emirates, Belgium, Brazil, Spain, the UK and Saudi Arabia, and from other markets when the machine requires it.' },
];

export default function Resources() {
  usePageMeta({
    title: 'Nigeria Machinery Import Checklist & Guides | Macacy Consulting',
    description: 'Download the 48-point Nigeria machinery import checklist and spec guide. Plain-English guides to Form M, PAAR, SONCAP, Incoterms and landed cost.',
  });

  return (
    <>
      <Section>
        <span className="eyebrow">The Knowledge</span>
        <h1>You should know this before you import.</h1>
        <p>Know before you import.</p>
      </Section>

      <Section tight>
        <h2>Downloads</h2>
        <div className="dl-grid">
          <LeadGate
            title="Nigeria Machinery Import Checklist"
            blurb="All 48 points. The full version of the preview on Services."
            source="checklist-download"
          />
          <LeadGate
            title="Specification Guide and Review Template"
            blurb="How to write a machinery specification document, with a one-page fill-in template."
            source="spec-guide-download"
          />
        </div>
        <style>{`.dl-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--s-3); margin-top: var(--s-3); } @media (max-width: 720px) { .dl-grid { grid-template-columns: 1fr; } }`}</style>
      </Section>

      <Section tight>
        <h2>Import guides</h2>
        <div className="guides">
          {guides.map((g) => (
            <details key={g.slug} className="guide">
              <summary>{g.title}</summary>
              <div className="guide__body">
                {g.table && (
                  <table>
                    <thead><tr><th>Term</th><th>Seller handles</th><th>Buyer handles</th></tr></thead>
                    <tbody>
                      {g.table.map((r) => (
                        <tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td></tr>
                      ))}
                    </tbody>
                  </table>
                )}
                <ul>{g.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
                <p className="guide__checked">{g.checked}</p>
                <p className="guide__disclaimer">General guidance, not legal advice.</p>
              </div>
            </details>
          ))}
        </div>
        <style>{`
          .guides { display: grid; gap: var(--s-2); margin-top: var(--s-3); }
          .guide { background: #fff; border: 1px solid var(--border); border-radius: var(--r-md); }
          .guide summary { padding: var(--s-3); font-weight: 600; cursor: pointer; color: var(--slate); }
          .guide__body { padding: 0 var(--s-3) var(--s-3); }
          .guide__body ul { color: var(--text-muted); padding-left: 1.2rem; }
          .guide__body table { width: 100%; border-collapse: collapse; margin-bottom: var(--s-2); font-size: 0.9rem; }
          .guide__body th, .guide__body td { border: 1px solid var(--border); padding: 0.5rem; text-align: left; }
          .guide__body th { background: var(--bg-alt); }
          .guide__checked { font-size: 0.78rem; color: var(--text-muted); }
          .guide__disclaimer { font-size: 0.78rem; color: var(--gold); font-weight: 600; }
        `}</style>
      </Section>

      <Section tight>
        <h2>Market Updates</h2>
        <p style={{ fontSize: '0.85rem' }}>Updated monthly. Last updated October 2026</p>
        <div className="mu-grid">
          {marketUpdates.map((u, i) => (
            <article key={i} className="mu">
              <div className="mu__top"><span className="mu__icon">{u.icon}</span><span className="mu__date">{u.date}</span></div>
              <h3 className="mu__h">{u.headline}</h3>
              <p className="mu__m"><strong>What it means for importers:</strong> {u.meaning}</p>
              <p className="mu__s">
                Source:{' '}
                {u.sources.map((s, si) => (
                  <span key={si}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
                    {si < u.sources.length - 1 ? ' / ' : ''}
                  </span>
                ))}
              </p>
            </article>
          ))}
        </div>
        <style>{`
          .mu-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--s-2); margin-top: var(--s-3); }
          .mu { background: #fff; border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--s-3); }
          .mu__top { display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted); font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; }
          .mu__icon { color: var(--gold); }
          .mu__h { margin: 0.6rem 0 0.4rem; font-size: 1.02rem; color: var(--slate); }
          .mu__m { font-size: 0.85rem; }
          .mu__s { font-size: 0.72rem; color: var(--text-muted); margin-top: var(--s-1); }
          .mu__s a { color: var(--slate); text-decoration: underline; text-underline-offset: 2px; }
          .mu__s a:hover { color: var(--gold); }
          @media (max-width: 900px) { .mu-grid { grid-template-columns: 1fr; } }
        `}</style>
      </Section>

      <Section tight>
        <h2>FAQ</h2>
        <Accordion items={faqs} />
      </Section>

      <Section dark tight>
        <h2 style={{ color: '#fff' }}>Ready to start?</h2>
        <p style={{ color: 'rgba(255,255,255,0.8)' }}>Get a free spec review before you pay a deposit.</p>
        <Button to="/contact">Free Spec Review</Button>
      </Section>
    </>
  );
}
