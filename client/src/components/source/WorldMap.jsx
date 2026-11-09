import { useEffect, useState } from 'react';
import { countries } from '../../data/sources.js';

// Public-domain world map SVG (Natural Earth 1:110m, simplified)
const MAP_SRC = 'https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg';

// Lat/lng → position on the map image (equirectangular).
// Left/right edges = -180/+180 lng, top/bottom = +90/-90 lat.
function project(lat, lng) {
  return {
    left: ((lng + 180) / 360) * 100,
    top: ((90 - lat) / 180) * 50,
  };
}

// Per-country label offsets to prevent overlap in crowded regions.
const LABEL_OFFSETS = {
  'Netherlands':  { dx: -5.5, dy: -1.6 },
  'Belgium':      { dx: -6.5, dy: -0.4 },
  'UK':           { dx: -4.5, dy:  2.2 },
  'Germany':      { dx:  1.5, dy: -1.2 },
  'Italy':        { dx:  1.5, dy:  1.2 },
  'Spain':        { dx: -4.5, dy:  1.4 },
  'Turkey':       { dx:  1.5, dy: -1.0 },
  'UAE':          { dx:  1.5, dy: -1.0 },
  'Saudi Arabia': { dx:  1.5, dy:  1.4 },
  'India':        { dx:  1.5, dy:  1.0 },
  'China':        { dx:  1.5, dy: -1.4 },
  'USA':          { dx:  1.5, dy:  0.4 },
  'Brazil':       { dx:  1.5, dy:  1.0 },
};

export default function WorldMap() {
  const [loaded, setLoaded] = useState(false);
  const nigeria = project(9, 8);

  const targets = [
    { name: 'Germany', lat: 51, lng: 10 },
    { name: 'Italy', lat: 42, lng: 12 },
    { name: 'India', lat: 22, lng: 79 },
    { name: 'Turkey', lat: 39, lng: 35 },
    { name: 'USA', lat: 38, lng: -97 },
    { name: 'China', lat: 35, lng: 105 },
    { name: 'Netherlands', lat: 52, lng: 5 },
    { name: 'UAE', lat: 24, lng: 54 },
    { name: 'Belgium', lat: 50, lng: 4 },
    { name: 'Brazil', lat: -14, lng: -51 },
    { name: 'Spain', lat: 40, lng: -4 },
    { name: 'UK', lat: 54, lng: -2 },
    { name: 'Saudi Arabia', lat: 24, lng: 45 },
  ];

  return (
    <div className="wm">
      <div className="wm-canvas">
        <img
          src={MAP_SRC}
          alt="World map"
          className="wm-img"
          onLoad={() => setLoaded(true)}
        />
        <svg
          viewBox="0 0 100 50"
          preserveAspectRatio="none"
          className="wm-overlay"
          aria-hidden={!loaded}
        >
          {/* Curved dashed arcs from each country to Nigeria */}
          <g stroke="var(--gold-bright)" strokeWidth="1.2" fill="none" opacity="0.9">
            {targets.map((c) => {
              const from = project(c.lat, c.lng);
              const midX = (from.left + nigeria.left) / 2;
              const midY = (from.top + nigeria.top) / 2 - 8;
              return (
                <path
                  key={`arc-${c.name}`}
                  d={`M ${from.left} ${from.top} Q ${midX} ${midY} ${nigeria.left} ${nigeria.top}`}
                  strokeDasharray="1.6 1.2"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
          </g>

          {/* Country pins */}
          {targets.map((c) => {
            const p = project(c.lat, c.lng);
            const off = LABEL_OFFSETS[c.name] || { dx: 1.8, dy: 0.6 };
            return (
              <g key={`pin-${c.name}`}>
                <circle cx={p.left} cy={p.top} r="1.1" fill="var(--gold-bright)" />
                <text
                  x={p.left + off.dx}
                  y={p.top + off.dy}
                  fontSize="1.5"
                  fontFamily="var(--font-body)"
                  fontWeight="600"
                  fill="var(--gold-bright)"
                  style={{ paintOrder: 'stroke', stroke: '#1f2230', strokeWidth: 0.3 }}
                >
                  {c.name}
                </text>
                <title>{c.name}</title>
              </g>
            );
          })}

          {/* Nigeria */}
          <g>
            <circle cx={nigeria.left} cy={nigeria.top} r="2.6" fill="var(--gold)" opacity="0.35" />
            <circle cx={nigeria.left} cy={nigeria.top} r="1.4" fill="var(--gold-bright)" />
          </g>
        </svg>
      </div>

      <div className="wm-legend">
        {countries.map((c) => (
          <span key={c.name} className="wm-legend__item">{c.name}</span>
        ))}
      </div>

      <style>{`
        .wm { width: 100%; }
        .wm-canvas {
          position: relative;
          width: 100%;
          aspect-ratio: 2 / 1;
          background: #1f2230;
          border-radius: var(--r-md);
          overflow: hidden;
        }
        .wm-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: invert(1) brightness(0.75) sepia(0.15) hue-rotate(200deg) saturate(0.5);
          opacity: 0.9;
        }
        .wm-overlay {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        .wm-legend {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem 1.2rem;
          margin-top: var(--s-2);
        }
        .wm-legend__item {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.75);
        }
      `}</style>
    </div>
  );
}




