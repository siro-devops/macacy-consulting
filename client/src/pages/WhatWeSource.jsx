import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/seo.js';
import Section from '../components/ui/Section.jsx';
import Button from '../components/ui/Button.jsx';
import WorldMap from '../components/source/WorldMap.jsx';
import { categories } from '../data/categories.js';

export default function WhatWeSource() {
  usePageMeta({
    title: 'Industrial Machinery Sourcing | Macacy Consulting',
    description: 'Industrial machinery sourced from Germany, Italy, India, Turkey, China, the USA and more, then verified and inspected before it ships to Nigeria.',
  });

  const [openSlug, setOpenSlug] = useState(null);

  function toggle(slug) {
    setOpenSlug(openSlug === slug ? null : slug);
  }

  return (
    <>
      <Section dark>
        <span className="eyebrow">The Scope</span>
        <h1 style={{ color: '#fff' }}>Global sources verified for Nigeria.</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 'var(--s-4)' }}>
          Wherever the right machine is made, we find it. We match the machine to the market.
        </p>
        <WorldMap />
        <p className="sources-line">
          We source from Germany, Italy, India, Turkey, the USA, China, the Netherlands, the United Arab
          Emirates, Belgium, Brazil, Spain, the UK and Saudi Arabia, and from other markets when the
          machine requires it.
        </p>
        <style>{`
          .sources-line {
            margin-top: var(--s-3);
            font-size: 0.9rem;
            color: rgba(255,255,255,0.7);
            max-width: 80ch;
          }
        `}</style>
      </Section>

      <Section>
        <span className="eyebrow">Categories</span>
        <h2 style={{ margin: 'var(--s-1) 0 var(--s-2)' }}>{categories.length} categories. One standard.</h2>
        <p style={{ marginBottom: 'var(--s-4)' }}>Click any tile to see what we source and the first check we run.</p>

        <div className="cat-grid">
          {categories.map((c) => {
            const isOpen = openSlug === c.slug;
            return (
              <div key={c.slug} className={`cat-cell ${isOpen ? 'is-open' : ''}`}>
                <button
                  className="cat-tile"
                  onClick={() => toggle(c.slug)}
                  aria-expanded={isOpen}
                  aria-controls={`panel-${c.slug}`}
                >
                  {c.image ? <img src={c.image} alt="" className="cat-tile__img" onError={(e) => { e.currentTarget.style.display = "none"; }} /> : <span className="cat-tile__bg" aria-hidden />}
                  <span className="cat-tile__name">{c.name}</span>
                  <span className="cat-tile__chev" aria-hidden>{isOpen ? '−' : '+'}</span>
                </button>

                {isOpen && (
                  <div id={`panel-${c.slug}`} className="cat-panel">
                    <h4 className="cat-panel__h">Equipment</h4>
                    <ul className="cat-panel__equip">
                      {c.equipment.map((e, i) => <li key={i}>{e}</li>)}
                    </ul>
                    <p className="cat-panel__check"><strong>One-line check:</strong> {c.check}</p>
                    <Link to={`/what-we-source/${c.slug}`} className="cat-panel__link">
                      See full detail &rarr;
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 'var(--s-5)' }}>
          <h2>Don&rsquo;t see your equipment?</h2>
          <p style={{ marginBottom: 'var(--s-3)' }}>Verify this machine before you buy.</p>
          <Button to="/contact">Free Spec Review</Button>
        </div>

        <style>{`
          .cat-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: var(--s-2);
            align-items: start;
          }

          .cat-cell { display: flex; flex-direction: column; }

          .cat-tile {
            position: relative;
            aspect-ratio: 5 / 3;
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            border-radius: var(--r-md);
            padding: var(--s-2);
            background: linear-gradient(160deg, #3a3f52, #1f2230);
            color: #fff;
            border: 1px solid transparent;
            cursor: pointer;
            transition: transform 0.25s var(--ease), border-color 0.25s var(--ease), box-shadow 0.25s var(--ease);
            text-align: left;
            width: 100%;
            overflow: hidden;
          }
          .cat-tile:hover {
            border-color: var(--gold);
            transform: translateY(-2px);
            box-shadow: 0 12px 28px rgba(201,169,97,0.18);
          }
          .cat-cell.is-open .cat-tile {
            border-color: var(--gold);
            box-shadow: 0 0 0 2px var(--gold);
          }
          .cat-tile__bg { position: absolute; inset: 0; opacity: 0.9; } .cat-tile__img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.85; }
          .cat-tile__name {
            position: relative;
            font-weight: 600;
            font-size: 0.92rem;
            line-height: 1.3;
            max-width: 80%;
          }
          .cat-tile__chev {
            position: relative;
            font-size: 1.2rem;
            color: var(--gold);
            line-height: 1;
          }

          .cat-panel {
            background: #fff;
            border: 1px solid var(--gold);
            border-top: 0;
            border-radius: 0 0 var(--r-md) var(--r-md);
            padding: var(--s-3);
            margin-top: -8px;
            padding-top: calc(var(--s-3) + 8px);
            box-shadow: 0 8px 24px rgba(45,49,66,0.08);
            animation: panelFade 0.25s var(--ease);
          }
          @keyframes panelFade { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }

          .cat-panel__h {
            font-family: var(--font-body);
            font-size: 0.72rem;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: var(--gold);
            margin-bottom: 0.4rem;
          }
          .cat-panel__equip {
            list-style: none;
            padding: 0;
            margin: 0 0 var(--s-2);
            font-size: 0.85rem;
            color: var(--text-muted);
          }
          .cat-panel__equip li {
            padding: 0.3rem 0;
            border-bottom: 1px dashed var(--border);
          }
          .cat-panel__equip li:last-child { border-bottom: 0; }
          .cat-panel__check {
            font-size: 0.85rem;
            color: var(--text);
            margin: 0 0 var(--s-2);
          }
          .cat-panel__link {
            font-size: 0.82rem;
            font-weight: 700;
            color: var(--slate);
            text-decoration: underline;
            text-underline-offset: 2px;
          }
          .cat-panel__link:hover { color: var(--gold); }

          @media (max-width: 1024px) { .cat-grid { grid-template-columns: repeat(3, 1fr); } }
          @media (max-width: 720px)  { .cat-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 480px)  { .cat-grid { grid-template-columns: 1fr; } }
        `}</style>
      </Section>
    </>
  );
}

