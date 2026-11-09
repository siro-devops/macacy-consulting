import { useState, useMemo } from 'react';
import { usePageMeta } from '../lib/seo.js';
import Section from '../components/ui/Section.jsx';
import Button from '../components/ui/Button.jsx';
import CaseFileCard from '../components/proof/CaseFileCard.jsx';
import { caseFiles, failureTypes } from '../data/caseFiles.js';

const reports = [
  { id: 'r1', title: 'Motor nameplate inspection', file: '/documents/reports/report-001-motor-nameplate.pdf', date: 'Oct 2026', case: 'Case File 001' },
  { id: 'r2', title: 'Control panel verification', file: '/documents/reports/report-002-control-panel.pdf', date: 'Oct 2026', case: 'Case File 001' },
  { id: 'r3', title: 'Container seal record', file: '/documents/reports/report-003-container-seal.pdf', date: 'Oct 2026', case: 'Case File 001' },
];

const fieldNotes = [
  { id: 'n1', img: '/images/notes/note-1-voltage.jpg', caption: 'Client facility: 415V. Supplier default: 380V. Flagged.', full: 'Client confirmed on-site: facility runs on 415V three-phase, 50Hz. Supplier spec sheet for the injection molding machine states 380V, 50Hz. Gap: 35V (9.2% above rated). Flagged for written supplier confirmation before shipment.' },
  { id: 'n2', img: '/images/notes/note-2-spare-parts.jpg', caption: 'Spare parts: local agent confirmed for Siemens PLC only. Not for the Delta drive.', full: 'Supplier local Nigerian agent confirmed by phone: Siemens S7-1200 PLC parts available locally. Delta VFD parts NOT available locally. Client requested supplier substitute a Siemens or Schneider drive.' },
  { id: 'n3', img: '/images/notes/note-3-control-panel.jpg', caption: 'Control panel language: Mandarin or German or Dutch. Specify English in the purchase order.', full: 'Three machines inspected this quarter, three language issues. Lesson: specify English interface, alarm log, safety labels, operator manual and wiring diagram separately in the PO.' },
  { id: 'n4', img: '/images/notes/note-4-material-input.jpg', caption: 'Material input: client processes cassava. Machine spec says maize. Re-verify.', full: 'Client is a cassava processor in Edo State. Machine ordered for maize. Client actual input: cassava, more fibrous, higher starch. Supplier tested with cassava: 82 percent of rated throughput. Acceptable.' },
];

export default function ProofFiles() {
  usePageMeta({
    title: 'Machinery Inspection Reports & Case Files | Macacy Consulting',
    description: 'Redacted inspection reports, field notes, and eight real machinery import case files from Nigeria.',
  });

  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered = useMemo(
    () => (filter === 'All' ? caseFiles : caseFiles.filter((c) => c.failureType.includes(filter))),
    [filter]
  );

  function openLightbox(note) {
    setLightbox(note);
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    setLightbox(null);
    document.body.style.overflow = '';
  }

  return (
    <>
      <Section dark>
        <span className="eyebrow">The Proof</span>
        <h1 style={{ color: '#fff' }}>The proof is in the paperwork. What most buyers miss, we catch.</h1>
      </Section>

      <div className="jumpbar">
        <div className="container">
          <a href="#reports">Inspection Reports</a>
          <a href="#notes">Field Notes</a>
          <a href="#case-files">Case Files</a>
        </div>
        <style>{`
          .jumpbar { background: var(--bg-alt); border-bottom: 1px solid var(--border); position: sticky; top: var(--header-h); z-index: 20; }
          .jumpbar .container { display: flex; gap: var(--s-3); padding-top: 0.8rem; padding-bottom: 0.8rem; }
          .jumpbar a { font-size: 0.85rem; font-weight: 600; color: var(--text-muted); }
          .jumpbar a:hover { color: var(--gold); }
        `}</style>
      </div>

      <Section id="reports">
        <span className="eyebrow">#reports</span>
        <h2>Macacy Inspection Reports. Our team, on the factory floor.</h2>
        <div className="rep-grid">
          {reports.map((r) => (
            <a key={r.id} href={r.file} target="_blank" rel="noopener noreferrer" className="rep">
              <div className="rep__bg">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                  <line x1="9" y1="18" x2="15" y2="18" />
                </svg>
              </div>
              <div className="rep__meta">
                <span className="rep__case">{r.case}</span>
                <span className="rep__date">{r.date}</span>
              </div>
              <span className="rep__title">{r.title}</span>
              <span className="rep__cta">Open PDF &rarr;</span>
            </a>
          ))}
        </div>
        <style>{`
          .rep-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--s-3); margin-top: var(--s-4); }
          .rep { position: relative; display: flex; flex-direction: column; aspect-ratio: 4 / 3; background: #fff; border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--s-3); overflow: hidden; transition: transform 0.25s var(--ease), border-color 0.25s var(--ease), box-shadow 0.25s var(--ease); will-change: transform; }
          .rep:hover { transform: translateY(-3px) scale(1.03); border-color: var(--gold); box-shadow: 0 0 0 2px var(--gold), 0 14px 34px rgba(201,169,97,0.28); z-index: 2; }
          .rep__bg { position: absolute; inset: 0; background: linear-gradient(160deg, #e9e6df, #d8d4ca); display: grid; place-items: center; color: var(--slate); opacity: 0.9; }
          .rep__meta { position: relative; display: flex; justify-content: space-between; font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; color: var(--text-muted); }
          .rep__case { color: var(--gold); }
          .rep__date { color: var(--text-muted); }
          .rep__title { position: relative; margin-top: auto; font-weight: 600; font-size: 0.95rem; color: var(--slate); margin-bottom: 0.4rem; }
          .rep__cta { position: relative; font-size: 0.78rem; font-weight: 700; color: var(--slate); }
          .rep:hover .rep__cta { color: var(--gold); }
          @media (max-width: 720px) { .rep-grid { grid-template-columns: 1fr; } }
        `}</style>
      </Section>

      <Section id="notes" tight>
        <span className="eyebrow">#notes</span>
        <h2>Field Notes</h2>
        <p style={{ marginTop: 'var(--s-2)', maxWidth: '62ch', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Click any note to view the full image.
        </p>
        <div className="notes-grid">
          {fieldNotes.map((n) => (
            <button
              key={n.id}
              type="button"
              className="note"
              onClick={() => openLightbox(n)}
              aria-label={`View field note: ${n.caption}`}
            >
              <div
                className="note__paper"
                style={{ backgroundImage: `url(${n.img}), linear-gradient(180deg, #f6f2e6, #ece5d1)` }}
              />
              <p className="note__caption">{n.caption}</p>
            </button>
          ))}
        </div>
        <style>{`
          .notes-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--s-2); margin-top: var(--s-3); }
          .note {
            display: flex;
            flex-direction: column;
            background: #fff;
            border: 1px solid var(--border);
            border-radius: var(--r-md);
            overflow: hidden;
            text-align: left;
            padding: 0;
            cursor: pointer;
            transition: transform 0.25s var(--ease), border-color 0.25s var(--ease), box-shadow 0.25s var(--ease);
            will-change: transform;
          }
          .note:hover, .note:focus-visible {
            transform: translateY(-3px) scale(1.03);
            border-color: var(--gold);
            box-shadow: 0 0 0 2px var(--gold), 0 14px 34px rgba(201,169,97,0.24);
            z-index: 2;
            outline: none;
          }
          .note__paper {
            aspect-ratio: 4 / 3;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            border-bottom: 1px solid var(--border);
          }
          .note__caption {
            font-family: var(--font-body);
            font-size: 0.78rem;
            font-weight: 600;
            color: var(--slate);
            padding: 0.7rem 0.9rem;
            line-height: 1.4;
            margin: 0;
          }
          @media (max-width: 1024px) { .notes-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 600px) { .notes-grid { grid-template-columns: 1fr; } }

          .lightbox {
            position: fixed;
            inset: 0;
            z-index: 200;
            background: rgba(15, 18, 30, 0.92);
            display: grid;
            place-items: center;
            padding: var(--s-3);
            animation: lbFade 0.2s var(--ease);
          }
          @keyframes lbFade { from { opacity: 0; } to { opacity: 1; } }
          .lightbox__inner {
            position: relative;
            max-width: min(1100px, 100%);
            max-height: 92vh;
            display: flex;
            flex-direction: column;
            gap: var(--s-2);
            align-items: center;
          }
          .lightbox__img {
            max-width: 100%;
            max-height: 78vh;
            border-radius: var(--r-md);
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            background: #fff;
            object-fit: contain;
          }
          .lightbox__caption {
            color: #fff;
            font-size: 0.95rem;
            line-height: 1.5;
            max-width: 70ch;
            text-align: center;
            padding: 0 var(--s-2);
          }
          .lightbox__close {
            position: absolute;
            top: -44px;
            right: 0;
            background: transparent;
            border: 1px solid rgba(255,255,255,0.4);
            color: #fff;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            font-size: 1.1rem;
            cursor: pointer;
            display: grid;
            place-items: center;
          }
          .lightbox__close:hover { border-color: var(--gold); color: var(--gold); }
          @media (max-width: 600px) {
            .lightbox__close { top: 8px; right: 8px; }
            .lightbox__img { max-height: 70vh; }
          }
        `}</style>
      </Section>

      {lightbox && (
        <div className="lightbox" onClick={closeLightbox} role="dialog" aria-modal="true" aria-label="Field note preview">
          <div className="lightbox__inner" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox__close" onClick={closeLightbox} aria-label="Close">
              &times;
            </button>
            <img src={lightbox.img} alt={lightbox.caption} className="lightbox__img" />
            <p className="lightbox__caption">{lightbox.caption}</p>
          </div>
          <style>{`
            .lightbox { position: fixed; inset: 0; z-index: 200; background: rgba(15, 18, 30, 0.92); display: grid; place-items: center; padding: var(--s-3); }
            .lightbox__inner { position: relative; max-width: min(1100px, 100%); max-height: 92vh; display: flex; flex-direction: column; gap: var(--s-2); align-items: center; }
            .lightbox__img { max-width: 100%; max-height: 78vh; border-radius: var(--r-md); box-shadow: 0 20px 60px rgba(0,0,0,0.5); background: #fff; object-fit: contain; }
            .lightbox__caption { color: #fff; font-size: 0.95rem; line-height: 1.5; max-width: 70ch; text-align: center; }
            .lightbox__close { position: absolute; top: -44px; right: 0; background: transparent; border: 1px solid rgba(255,255,255,0.4); color: #fff; width: 36px; height: 36px; border-radius: 50%; font-size: 1.1rem; cursor: pointer; display: grid; place-items: center; }
            .lightbox__close:hover { border-color: var(--gold); color: var(--gold); }
          `}</style>
        </div>
      )}

      <Section id="case-files">
        <span className="eyebrow">#case-files</span>
        <h2>The cost of missing verification.</h2>
        <div className="filters" role="tablist">
          {['All', ...failureTypes].map((f) => (
            <button key={f} role="tab" aria-selected={filter === f} className={`filter ${filter === f ? 'is-active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
        <div className="cf-grid">
          {filtered.map((c) => <CaseFileCard key={c.slug} file={c} />)}
        </div>
        <div className="closing">
          <h2>Planning a machinery import?</h2>
          <p>Get a free spec review before you pay a deposit.</p>
          <Button to="/contact">Free Spec Review</Button>
        </div>
        <style>{`
          .filters { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: var(--s-3) 0; }
          .filter { padding: 0.45rem 0.9rem; font-size: 0.82rem; font-weight: 600; border: 1px solid var(--border); background: #fff; border-radius: 999px; color: var(--text-muted); transition: all 0.15s; }
          .filter:hover { border-color: var(--gold); color: var(--gold); }
          .filter.is-active { background: var(--slate); color: #fff; border-color: var(--slate); }
          .cf-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--s-3); }
          .closing { margin-top: var(--s-5); padding: var(--s-4); background: var(--slate); border-radius: var(--r-md); color: #fff; }
          .closing h2 { color: #fff; }
          .closing p { color: rgba(255,255,255,0.8); margin: var(--s-1) 0 var(--s-3); }
          @media (max-width: 900px) { .cf-grid { grid-template-columns: 1fr; } }
        `}</style>
      </Section>
    </>
  );
}
