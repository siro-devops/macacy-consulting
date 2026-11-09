const rows = [
  {
    label: 'Voltage',
    without: 'You discover the voltage mismatch after the machine arrives.',
    with: 'We confirm voltage, phase and frequency against your facility before you pay.',
  },
  {
    label: 'Spare parts',
    without: 'You wait 6 to 12 weeks for a replacement part from overseas.',
    with: 'We verify local spare parts availability and establish a pipeline before shipment.',
  },
  {
    label: 'Site',
    without: 'You pay for a foundation, air supply or transformer you did not plan for.',
    with: 'We review installation requirements against your site before production begins.',
  },
  {
    label: 'Control panel',
    without: 'Your operator cannot read the control panel.',
    with: 'We specify the interface language in the purchase order.',
  },
  {
    label: 'Training',
    without: 'Your team needs training that was not budgeted.',
    with: 'We confirm operator skill match and training requirements upfront.',
  },
  {
    label: 'Material',
    without: 'The machine processes the wrong material.',
    with: 'We test material input compatibility against your actual raw materials.',
  },
  {
    label: 'Landed cost',
    without: 'The landed cost can end up 30% or more above the quote.',
    with: 'Every cost (machine, shipping, duties, installation) is itemised in advance.',
  },
];

export default function ComparisonTable() {
  return (
    <div className="cmp">
      <div className="cmp-header">
        <div className="cmp-header__cell cmp-header__cell--label" />
        <div className="cmp-header__cell">Without verification</div>
        <div className="cmp-header__cell">With Macacy</div>
      </div>

      <div className="cmp-rows">
        {rows.map((r, i) => (
          <div key={i} className="cmp-row">
            <div className="cmp-row__label"><span>{r.label}</span></div>
            <div className="cmp-row__side cmp-row__side--without">
              <p className="cmp-row__text">{r.without}</p>
            </div>
            <div className="cmp-row__side cmp-row__side--with">
              <p className="cmp-row__text">{r.with}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="cmp-note"><strong>Based on Our Case Files.</strong></p>

      <style>{`
        .cmp { width: 100%; }

        .cmp-header {
          display: grid;
          grid-template-columns: 180px 1fr 1fr;
          gap: 1px;
          background: var(--border);
          border-radius: var(--r-md) var(--r-md) 0 0;
          overflow: hidden;
        }
        .cmp-header__cell {
          padding: var(--s-3);
          text-align: center;
          background: var(--slate);
          color: var(--gold);
          font-family: var(--font-body);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .cmp-header__cell--label {
          background: var(--slate-deep);
        }

        .cmp-rows {
          display: flex;
          flex-direction: column;
          gap: 1px;
          background: var(--border);
          border-left: 1px solid var(--border);
          border-right: 1px solid var(--border);
        }
        .cmp-row {
          display: grid;
          grid-template-columns: 180px 1fr 1fr;
          gap: 1px;
          background: var(--border);
          transition: transform 0.25s var(--ease), box-shadow 0.25s var(--ease);
          position: relative;
        }
        .cmp-row:hover {
          transform: translateX(4px);
          box-shadow: -4px 0 0 var(--gold), 0 8px 24px rgba(45,49,66,0.08);
          z-index: 1;
        }

        .cmp-row__label {
          display: flex;
          align-items: center;
          padding: var(--s-3);
          background: #f5f2eb;
          border-left: 3px solid var(--gold);
        }
        .cmp-row__label span {
          display: inline-block;
          font-family: var(--font-body);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--slate);
          padding: 5px 12px;
          border-radius: 999px;
          border: 1px solid var(--gold);
          background: #fff;
          white-space: nowrap;
        }

        .cmp-row__side {
          display: flex;
          align-items: center;
          padding: var(--s-3);
          background: #fff;
          min-height: 88px;
        }
        .cmp-row__side--without {
          background: #faf8f4;
        }
        .cmp-row__side--with {
          background: #fffdf8;
        }

        .cmp-row__text {
          font-size: 0.92rem;
          line-height: 1.5;
          margin: 0;
          color: var(--text);
        }
        .cmp-row__side--without .cmp-row__text {
          color: var(--text-muted);
        }

        .cmp-note {
          font-size: 0.78rem;
          color: var(--text-muted);
          margin-top: var(--s-3);
          text-align: center;
        }

        @media (max-width: 900px) {
          .cmp-header {
            grid-template-columns: 1fr 1fr;
          }
          .cmp-header__cell--label {
            display: none;
          }
          .cmp-row {
            grid-template-columns: 1fr 1fr;
          }
          .cmp-row__label {
            grid-column: 1 / -1;
            border-left: 0;
            border-top: 3px solid var(--gold);
            padding: var(--s-2) var(--s-3);
            min-height: 0;
          }
          .cmp-row:hover {
            transform: none;
            box-shadow: none;
          }
        }

        @media (max-width: 600px) {
          .cmp-header {
            grid-template-columns: 1fr;
          }
          .cmp-header__cell:first-child {
            display: none;
          }
          .cmp-row {
            grid-template-columns: 1fr;
          }
          .cmp-row__side {
            min-height: 0;
            padding: var(--s-2) var(--s-3);
          }
          .cmp-row__side--without::before {
            content: "Without";
            display: block;
            font-size: 0.65rem;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: var(--text-muted);
            margin-bottom: 0.35rem;
          }
          .cmp-row__side--with::before {
            content: "With Macacy";
            display: block;
            font-size: 0.65rem;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: var(--gold);
            margin-bottom: 0.35rem;
          }
        }
      `}</style>
    </div>
  );
}


