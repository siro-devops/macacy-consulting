export default function CostChart() {
  const W = 640, H = 380, PAD = 48;
  const barW = 100;
  const bar1H = (29.7 / 35) * (H - PAD * 2);
  const bar2H = (21.5 / 35) * (H - PAD * 2);
  const baseY = H - PAD;
  const b1x = 130, b2x = 370;

  // Stacked segments for unverified (slate) â€” proportional to total 29.7
  const unvTotal = 29.7;
  const unvParts = [
    { label: 'Machine & landing', value: 20.0, color: '#2d3142' },
    { label: 'Downtime', value: 4.2, color: '#7a7f92' },
    { label: 'Repairs', value: 5.5, color: '#b23a2f' },
  ];
  // Verified (gold) â€” total 21.5
  const verTotal = 21.5;
  const verParts = [
    { label: 'Machine & landing', value: 20.0, color: 'var(--gold)' },
    { label: 'Verification fee', value: 1.5, color: '#e8d59a' },
  ];

  function stack(parts, total, barTop, x) {
    let y = barTop;
    return parts.map((p, i) => {
      const h = (p.value / total) * (baseY - barTop);
      const rect = (
        <rect key={i} x={x} y={y} width={barW} height={h} fill={p.color} />
      );
      y += h;
      return rect;
    });
  }

  return (
    <figure className="chart">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Case File 001 cost comparison">
        {/* Baseline */}
        <line x1={PAD} y1={baseY} x2={W - PAD} y2={baseY} stroke="#e3e0d8" strokeWidth="1" />

        {/* Unverified bar */}
        {stack(unvParts, unvTotal, baseY - bar1H, b1x)}
        <text x={b1x + barW / 2} y={baseY - bar1H - 14} textAnchor="middle" className="chart-val">
          N29.7M
        </text>
        <text x={b1x + barW / 2} y={baseY + 22} textAnchor="middle" className="chart-lbl">
          Unverified
        </text>

        {/* Verified bar */}
        {stack(verParts, verTotal, baseY - bar2H, b2x)}
        <text x={b2x + barW / 2} y={baseY - bar2H - 14} textAnchor="middle" className="chart-val">
          N21.5M
        </text>
        <text x={b2x + barW / 2} y={baseY + 22} textAnchor="middle" className="chart-lbl">
          Verified
        </text>

        {/* Dotted saved line */}
        <line
          x1={b1x + barW}
          y1={baseY - bar1H}
          x2={b2x + barW + 70}
          y2={baseY - bar1H}
          stroke="var(--gold)"
          strokeDasharray="5 5"
          strokeWidth="1.5"
        />
        <text x={b1x + barW + 10} y={baseY - bar1H - 8} className="chart-saved">
          N8.2M saved
        </text>
      </svg>

      {/* Legend */}
      <div className="chart-legend">
        <div className="chart-legend__col">
          <div className="chart-legend__title">Unverified: N29.7M</div>
          <ul>
            <li><span className="sw" style={{ background: '#2d3142' }} />Machine &amp; landing <b>N20M</b></li>
            <li><span className="sw" style={{ background: '#7a7f92' }} />Downtime <b>N4.2M</b></li>
            <li><span className="sw" style={{ background: '#b23a2f' }} />Repairs <b>N5.5M</b></li>
          </ul>
        </div>
        <div className="chart-legend__col">
          <div className="chart-legend__title">Verified: N21.5M</div>
          <ul>
            <li><span className="sw" style={{ background: 'var(--gold)' }} />Machine &amp; landing <b>N20M</b></li>
            <li><span className="sw" style={{ background: '#e8d59a' }} />Verification fee <b>N1.5M</b></li>
          </ul>
        </div>
      </div>

      <figcaption className="chart-cap">
        <p>
          The &ldquo;cheap&rdquo; machine cost 38% more than the verified machine. Landed cost and
          verification fee are estimates. <strong>Based on Macacy Case Files.</strong>
        </p>
      </figcaption>

      <style>{`
        .chart { margin: 0; }
        .chart svg { width: 100%; height: auto; }
        .chart-val {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 16px;
          fill: var(--text);
        }
        .chart-lbl {
          font-family: var(--font-body);
          font-size: 12px;
          fill: var(--text-muted);
          font-weight: 600;
        }
        .chart-saved {
          font-family: var(--font-body);
          font-size: 12px;
          fill: var(--gold);
          font-weight: 700;
        }
        .chart-legend {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--s-3);
          margin-top: var(--s-3);
        }
        .chart-legend__title {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--slate);
          margin-bottom: 0.4rem;
        }
        .chart-legend ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .chart-legend li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .chart-legend li b { color: var(--text); margin-left: auto; }
        .chart-legend .sw {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 2px;
          flex-shrink: 0;
        }
        .chart-cap p {
          font-size: 0.82rem;
          color: var(--text-muted);
          margin-top: var(--s-3);
        }
        @media (max-width: 640px) {
          .chart-legend { grid-template-columns: 1fr; }
        }
      `}</style>
    </figure>
  );
}

