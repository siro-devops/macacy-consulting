export default function StickyWhatsApp() {
  const message = encodeURIComponent("Hi Macacy, I'd like a free spec review for a machinery import.");
  return (
    <a href={`https://wa.me/2347039172842?text=${message}`} target="_blank" rel="noopener" className="sticky-wa" aria-label="Message Macacy Consulting on WhatsApp">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.6.2-.2.3-.7.9-.8 1-.2.2-.3.2-.6.1-1.5-.7-2.6-1.3-3.6-3-.3-.5.3-.4.8-1.4.1-.2 0-.4 0-.5 0-.1-.6-1.5-.9-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.8.8-1 1.9-1 3 .1 1.1.7 2.1 1.4 3 1.9 2.5 3.9 3.6 6.4 4.1 1 .2 1.7.2 2.3.1.7-.1 1.7-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.3c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>
      <span className="sticky-wa__label">WhatsApp</span>
      <style>{`
        .sticky-wa { position: fixed; right: 20px; bottom: 20px; z-index: 60; display: inline-flex; align-items: center; gap: 8px; background: #25d366; color: #fff; border-radius: 999px; padding: 12px 16px; box-shadow: var(--shadow-lift); font-weight: 600; font-size: 0.9rem; transition: transform 0.18s var(--ease); }
        .sticky-wa:hover { transform: translateY(-2px); }
        @media (max-width: 600px) { .sticky-wa__label { display: none; } .sticky-wa { padding: 14px; } }
      `}</style>
    </a>
  );
}