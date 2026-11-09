import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/what-we-source', label: 'What We Source' },
  { to: '/proof-files', label: 'Proof Files' },
  { to: '/resources', label: 'Resources' },
  { to: '/our-standard', label: 'Our Standard' },
  { to: '/contact', label: 'Contact' },
];
export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="logo">
          <span className="logo__mark">M</span>
          <span className="logo__text">Macacy<em>Consulting</em></span>
        </Link>
        <nav className={`nav ${open ? 'nav--open' : ''}`} aria-label="Primary">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`} onClick={() => setOpen(false)}>{l.label}</NavLink>
          ))}
        </nav>
        <Link to="/contact" className="btn btn--gold header-cta">Free Spec Review</Link>
        <button className="nav-toggle" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /><span /></button>
      </div>
      <style>{`
        .site-header { position: fixed; inset: 0 0 auto 0; height: var(--header-h); z-index: 50; background: rgba(250,250,247,0.92); backdrop-filter: saturate(180%) blur(12px); border-bottom: 1px solid var(--border); }
        .header-inner { height: 100%; display: flex; align-items: center; gap: var(--s-3); }
        .logo { display: flex; align-items: center; gap: 0.6rem; margin-right: auto; }
        .logo__mark { width: 34px; height: 34px; display: grid; place-items: center; background: var(--slate); color: var(--gold); border-radius: 6px; font-family: var(--font-display); font-weight: 800; font-size: 1.15rem; }
        .logo__text { font-family: var(--font-display); font-weight: 700; font-size: 1.15rem; color: var(--text); line-height: 1; }
        .logo__text em { display: block; font-style: normal; font-family: var(--font-body); font-size: 0.62rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); margin-top: 3px; font-weight: 600; }
        .nav { display: flex; align-items: center; gap: 0.25rem; }
        .nav__link { padding: 0.55rem 0.8rem; border-radius: 6px; font-size: 0.92rem; font-weight: 500; color: var(--text-muted); }
        .nav__link:hover { color: var(--text); }
        .nav__link.is-active { color: var(--slate); font-weight: 600; }
        .header-cta { margin-left: var(--s-2); }
        .nav-toggle { display: none; background: none; border: 0; padding: 8px; }
        .nav-toggle span { display: block; width: 22px; height: 2px; background: var(--slate); margin: 4px 0; border-radius: 2px; }
        @media (max-width: 1024px) {
          .nav { position: fixed; top: var(--header-h); left: 0; right: 0; flex-direction: column; align-items: stretch; gap: 0; background: var(--bg); padding: var(--s-2); border-bottom: 1px solid var(--border); transform: translateY(-120%); transition: transform 0.25s var(--ease); }
          .nav--open { transform: translateY(0); }
          .nav__link { padding: 0.9rem 0.8rem; }
          .nav-toggle { display: block; }
          .header-cta { display: none; }
        }
      `}</style>
    </header>
  );
}
