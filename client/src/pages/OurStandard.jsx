import { usePageMeta } from '../lib/seo.js';
import Button from '../components/ui/Button.jsx';
import { useEffect, useRef, useState } from 'react';
const lines = ['The machine arrived.','It never ran.','A factory lost 12 million on a machine that was never going to work. The supplier was honest, the factory was real. The product was exactly what was ordered. The problem was just one number, 380 volts. The facility ran on 415V.','But nobody asked.','This is not a story about any one country. Germany builds for 400V. India builds for 415V. China builds for 380V. Nigeria runs on 415V three-phase. This is a story about a broken chain of accountability.','Will this machine work in this factory?','Macacy Consulting was founded to answer that question. Before the deposit, before the order.','Not when it ships. Not when it arrives. When it runs.','Our own team inspects the machine on the factory floor, before the container is sealed. We do not delegate the most important step to a stranger.','That is our standard.'];
function Reveal({ children }) {
  const ref = useRef(null); const [on, setOn] = useState(false);
  useEffect(() => { const el = ref.current; if (!el) return; const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.25 }); io.observe(el); return () => io.disconnect(); }, []);
  return <div ref={ref} className={`reveal ${on ? 'is-on' : ''}`}>{children}</div>;
}
export default function OurStandard() {
  usePageMeta({ title: 'Our Standard | Procurement Consulting for Africa', description: 'We do not consider an order complete until the machine is running. Outcome-based procurement.' });
  return (
    <div className="os">
      <div className="os-bg" aria-hidden />
      <div className="container os-inner">
        {lines.map((l, i) => (i === 5 || i === 9 ? (<Reveal key={i}><h2 className="os-big">{l}</h2></Reveal>) : (<Reveal key={i}><p className="os-line">{l}</p></Reveal>)))}
        <Reveal><div style={{ marginTop: 'var(--s-5)' }}><Button to="/contact">Free Spec Review</Button></div></Reveal>
      </div>
      <style>{`
        .os { position: relative; padding: var(--s-7) 0; overflow: hidden; }
        .os-bg { position: absolute; inset: 0; background-image: url(/images/standard/injection-machine.jpg), radial-gradient(800px 500px at 70% 30%, rgba(201,169,97,0.12), transparent 60%), linear-gradient(160deg, #1f2230 0%, #2d3142 100%); background-size: cover; background-position: center; background-repeat: no-repeat; }
        .os-inner { position: relative; max-width: 820px; }
        .os-line { color: rgba(255,255,255,0.82); font-size: clamp(1.1rem, 2vw, 1.4rem); line-height: 1.6; margin: 0 0 var(--s-3); max-width: 62ch; }
        .os-big { color: #fff; font-family: var(--font-display); font-size: clamp(1.8rem, 4vw, 3rem); margin: 0 0 var(--s-3); }
        .reveal { opacity: 0; transform: translateY(16px); transition: opacity 0.7s var(--ease), transform 0.7s var(--ease); }
        .reveal.is-on { opacity: 1; transform: none; }
        @media (prefers-reduced-motion: reduce) { .reveal { opacity: 1; transform: none; transition: none; } }
      `}</style>
    </div>
  );
}
