import { usePageMeta } from '../lib/seo.js';
import Section from '../components/ui/Section.jsx';
import Button from '../components/ui/Button.jsx';
import ChecklistBlurred from '../components/services/ChecklistBlurred.jsx';
import StepsGrid from '../components/services/StepsGrid.jsx';
import ComparisonTable from '../components/services/ComparisonTable.jsx';

export default function Services() {
  usePageMeta({
    title: 'Pre-Import Verification & Inspection | Macacy Consulting',
    description: 'We verify 48 compatibility points and inspect every machine with our own team before it ships.',
  });

  return (
    <>
      <section className="svc-hero">
        <div className="container">
          <span className="eyebrow">The Process</span>
          <h1 className="svc-hero__h1">From specification to running machine. We manage every step.</h1>
          <h2 className="svc-hero__sub">The engagement closes when the machine is operational and you have confirmed it performs to specification.</h2>
        </div>
        <style>{`
          .svc-hero { background: var(--slate); padding: var(--s-7) 0; color: #fff; }
          .svc-hero .container { max-width: 940px; }
          .svc-hero__h1 {
            color: #fff;
            margin-top: var(--s-2);
            font-size: clamp(1.75rem, 3.2vw, 2.6rem);
            line-height: 1.2;
            max-width: 30ch;
          }
          .svc-hero__sub {
            color: #fff;
            margin-top: var(--s-3);
            font-size: clamp(1.05rem, 1.6vw, 1.35rem);
            font-weight: 500;
            line-height: 1.45;
            max-width: 46ch;
          }
        `}</style>
      </section>

      <Section tight>
        <div className="svc-cards">
          {[
            { id: 'source', t: 'Source', d: 'Shortlist vetted makers worldwide.' },
            { id: 'verify', t: 'Verify', d: 'Check the spec before you pay.' },
            { id: 'deliver', t: 'Deliver', d: 'Ship, clear, install, hand over.' },
          ].map((c) => (
            <a key={c.id} href={`#${c.id}`} className="svc-card"><img src={`/icons/${c.id}.svg`} alt="" className="svc-card__icon" onError={(e) => { e.currentTarget.style.display = "none"; }} />
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </a>
          ))}
        </div>
        <style>{`
          .svc-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--s-3); }
          .svc-card {
            background: #fff;
            border: 1px solid var(--border);
            border-radius: var(--r-md);
            padding: var(--s-3);
            transition: transform 0.25s var(--ease), border-color 0.25s var(--ease), box-shadow 0.25s var(--ease);
            will-change: transform;
            position: relative;
          }
          .svc-card:hover {
            border-color: var(--gold);
            transform: scale(1.06);
            box-shadow: 0 0 0 2px var(--gold), 0 12px 28px rgba(201,169,97,0.28);
            z-index: 2;
          }
          .svc-card__icon { display: block; height: 140px; width: auto; margin-bottom: var(--s-2); } .svc-card h3 { color: var(--slate); }
          .svc-card__icon { display: block; height: 140px; width: auto; margin-bottom: var(--s-2); } .svc-card p { margin-top: 0.4rem; font-size: 0.92rem; }
          @media (max-width: 720px) { .svc-cards { grid-template-columns: 1fr; } }
        `}</style>
      </Section>

      <Section id="source">
        <span className="eyebrow">Source</span>
        <h2>Shortlist vetted makers worldwide.</h2>
        <p>We find the machine. Supplier identification across 13 countries and our direct factory network, then specification, negotiation and order tracking until delivery. Sourcing happens after verification, never before.</p>
        <ul className="svc-list"><li>Technical specification written for the factory</li><li>Vetting: business licence, factory, production capacity</li><li>Price negotiation on your behalf</li><li>3 to 5 vetted suppliers, compared side by side</li></ul>
        <Button to="/contact">Free Spec Review</Button>
      </Section>

      <Section id="verify" dark>
        <span className="eyebrow">Verify</span>
        <h2 style={{ color: '#fff' }}>Check the spec before you pay.</h2>
        <p style={{ color: 'rgba(255,255,255,0.8)' }}>The question that decides whether your machine runs is: &ldquo;Will it work in my facility, with my power, my staff and my materials?&rdquo; We answer it before the deposit, not after the failure.</p>
        <ul className="svc-list svc-list--dark"><li>Voltage, phase and frequency against your measured supply</li><li>Spare parts availability and pipeline</li><li>Installation requirements and site power</li><li>Operator skill, material input and interface language</li></ul>
        <Button to="/contact">Free Spec Review</Button>
      </Section>

      <Section id="deliver">
        <span className="eyebrow">Deliver</span>
        <h2>Ship, clear, install, hand over.</h2>
        <p>The machine leaving the factory is the midpoint, not the end.</p>
        <ul className="svc-list"><li>Our own team inspects before the container is sealed</li><li>We oversee freight and customs clearance</li><li>Installation and commissioning support</li><li>Follow-up if something fails in month three</li></ul>
        <Button href="https://wa.me/2347039172842" variant="slate">Message Macacy Consulting on WhatsApp</Button>
      </Section>

      <Section>
        <span className="eyebrow">48 verification points checklist for every order. Same standard.</span>
        <h2 style={{ margin: 'var(--s-1) 0 var(--s-4)' }}>What we check before you pay.</h2>
        <ChecklistBlurred />
      </Section>

      <Section>
        <span className="eyebrow">How it works</span>
        <h2 style={{ margin: 'var(--s-1) 0 var(--s-4)' }}>From brief to running machine.</h2>
        <StepsGrid />
      </Section>

      <Section>
        <span className="eyebrow">Comparison</span>
        <h2 style={{ margin: 'var(--s-1) 0 var(--s-4)' }}>Without verification vs. with Macacy.</h2>
        <ComparisonTable />
      </Section>

      <Section dark tight className="services-closing">
        <h2 style={{ color: 'var(--gold)' }}>We don&rsquo;t hire inspectors, we are the inspectors.</h2>
        <p style={{ color: '#fff' }}>We send our own team. We verify the motor nameplate, photograph the control panel, and sign off before the container is sealed. We own the outcome.</p>
      </Section>

      <style>{`
        .svc-list { margin: var(--s-3) 0; padding-left: 1.2rem; color: var(--text-muted); }
        .svc-list li { margin: 0.4rem 0; }
        .svc-list--dark li { color: rgba(255,255,255,0.85); }

        section.section.services-closing {
          padding-bottom: 0 !important;
          background: var(--slate-deep) !important;
        }
        section.section.services-closing > .container > h2,
        section.section.services-closing > .container > p {
          margin-bottom: 0;
        }
      `}</style>
    </>
  );
}








