import { usePageMeta } from '../lib/seo.js';
import Section from '../components/ui/Section.jsx';
import ContactForm from '../components/forms/ContactForm.jsx';

export default function Contact() {
  usePageMeta({
    title: 'Contact Macacy Consulting | Procurement Consultant Abuja',
    description: 'Speak with a procurement consultant about your next machinery import.',
  });

  return (
    <>
      <Section dark>
        <div className="contact-hero">
          <span className="eyebrow">The Action</span>
          <h1>Three questions. Then a conversation on WhatsApp. That is how this starts.</h1>
        </div>
        <style>{`
          .contact-hero { text-align: center; max-width: 800px; margin: 0 auto; }
          .contact-hero h1 { color: #fff; margin-top: var(--s-2); font-size: clamp(1.8rem, 3.5vw, 2.6rem); line-height: 1.2; }
        `}</style>
      </Section>

      <Section>
        <ContactForm />
      </Section>

      <Section tight>
        <div className="contact-consultant">
          <h2>Speak with a Procurement Consultant</h2>
          <p>Prefer to reach us directly?</p>

          <div className="contact-cards">
            <a className="contact-item" href="https://wa.me/2347039172842" target="_blank" rel="noopener">
              <div className="contact-item__icon" aria-hidden>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.6.2-.2.3-.7.9-.8 1-.2.2-.3.2-.6.1-1.5-.7-2.6-1.3-3.6-3-.3-.5.3-.4.8-1.4.1-.2 0-.4 0-.5 0-.1-.6-1.5-.9-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.8.8-1 1.9-1 3 .1 1.1.7 2.1 1.4 3 1.9 2.5 3.9 3.6 6.4 4.1 1 .2 1.7.2 2.3.1.7-.1 1.7-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.3c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z"/>
                </svg>
              </div>
              <div>
                <strong>WhatsApp</strong>
                <span>+234 703 917 2842</span>
              </div>
            </a>

            <a className="contact-item" href="mailto:hello@macacy.com">
              <div className="contact-item__icon" aria-hidden>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </div>
              <div>
                <strong>Email</strong>
                <span>hello@macacy.com</span>
              </div>
            </a>
          </div>

          <ul className="contact-info">
            
            <li><strong>Response time:</strong> We respond within 4 business hours. If you message outside business hours, we will respond the next business day.</li>
          </ul>

          <p className="contact-note" style={{ textAlign: 'center', width: '100%' }}>No pressure. Just the next right step.</p>
        </div>
        <style>{`
          .contact-consultant { max-width: 720px; margin: 0 auto; text-align: center; }
          .contact-consultant h2 { margin-bottom: var(--s-1); }
          .contact-consultant > p { color: var(--text-muted); }
          .contact-cards {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--s-2);
            margin: var(--s-4) 0 var(--s-3);
          }
          .contact-item {
            display: flex;
            align-items: center;
            gap: var(--s-2);
            background: #fff;
            border: 1px solid var(--border);
            border-radius: var(--r-md);
            padding: var(--s-3);
            text-align: left;
            transition: transform 0.25s var(--ease), border-color 0.25s var(--ease), box-shadow 0.25s var(--ease);
          }
          .contact-item:hover {
            transform: translateY(-3px) scale(1.03);
            border-color: var(--gold);
            box-shadow: 0 0 0 2px var(--gold), 0 12px 28px rgba(201,169,97,0.24);
          }
          .contact-item__icon {
            display: inline-grid;
            place-items: center;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: var(--slate);
            color: var(--gold);
            flex-shrink: 0;
          }
          .contact-item strong {
            display: block;
            font-size: 0.72rem;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: var(--gold);
            margin-bottom: 3px;
          }
          .contact-item span { font-size: 0.92rem; color: var(--slate); font-weight: 600; }

          .contact-info {
            list-style: none;
            padding: 0;
            margin: var(--s-3) 0;
            text-align: left;
            display: flex;
            flex-direction: column;
            gap: 0.6rem;
            font-size: 0.9rem;
            color: var(--text-muted);
          }
          .contact-info strong { color: var(--slate); }
          .contact-note { font-size: 0.85rem; color: var(--text-muted); margin-top: var(--s-3); text-align: center; }

          @media (max-width: 640px) {
            .contact-cards { grid-template-columns: 1fr; }
          }
        `}</style>
      </Section>
    </>
  );
}




