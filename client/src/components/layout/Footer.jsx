import { Link } from 'react-router-dom';
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-brand">Macacy Consulting</div>
          <p className="footer-tagline">Procurement consulting for the African market.</p>
        </div>
        <div>
          <h4 className="footer-h">Contact</h4>
          <ul className="footer-list">
            <li><a href="https://wa.me/2347039172842" target="_blank" rel="noopener">WhatsApp</a></li>
            <li><a href="mailto:hello@macacy.com">Email</a></li>
            <li><Link to="/proof-files#case-files">Case Files</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="footer-h">Office</h4>
          <address className="footer-address">16 Trademore Avenue, Airport Road,<br />Abuja, Nigeria.</address>
        </div>
      </div>
      <div className="container footer-bottom"><span>&copy; {new Date().getFullYear()} Macacy Consulting. All rights reserved.</span></div>
      <style>{`
        .footer { background: var(--slate-deep); color: #fff; padding: var(--s-6) 0 var(--s-3); }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: var(--s-4); }
        .footer-brand { font-family: var(--font-display); font-size: 1.4rem; color: #fff; }
        .footer-tagline { color: rgba(255,255,255,0.65); max-width: 34ch; margin-top: 0.5rem; }
        .footer-h { font-family: var(--font-body); font-size: 0.78rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--gold); margin-bottom: var(--s-1); }
        .footer-list { list-style: none; padding: 0; margin: 0; }
        .footer-list li { margin: 0.4rem 0; }
        .footer-list a { color: rgba(255,255,255,0.8); }
        .footer-list a:hover { color: var(--gold); }
        .footer-address { color: rgba(255,255,255,0.7); font-style: normal; line-height: 1.6; }
        .footer-bottom { border-top: 1px solid rgba(255,255,255,0.12); margin-top: var(--s-4); padding-top: var(--s-2); font-size: 0.85rem; color: rgba(255,255,255,0.5); }
        @media (max-width: 720px) { .footer-grid { grid-template-columns: 1fr; } }
      `}</style>
    </footer>
  );
}

