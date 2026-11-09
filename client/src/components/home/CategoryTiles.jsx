import { Link } from 'react-router-dom';
import { categories } from '../../data/categories.js';
export default function CategoryTiles({ count = 6 }) {
  return (
    <div className="cat-grid">
      {categories.slice(0, count).map((c) => (
        <Link to="/what-we-source" key={c.slug} className="cat-tile">
          {c.image ? <img src={c.image} alt="" className="cat-tile__img" onError={(e) => { e.currentTarget.style.display = "none"; }} /> : <div className="cat-tile__bg" aria-hidden />}
          <span className="cat-tile__name">{c.name}</span>
          <span className="cat-tile__arrow" aria-hidden>&rarr;</span>
        </Link>
      ))}
      <style>{`
        .cat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--s-2); }
        .cat-tile { position: relative; aspect-ratio: 4/3; border-radius: var(--r-md); overflow: hidden; background: var(--slate); display: flex; align-items: flex-end; padding: var(--s-2); transition: transform 0.2s var(--ease), box-shadow 0.2s var(--ease); }
        .cat-tile:hover { transform: translateY(-3px); box-shadow: var(--shadow-lift); }
        .cat-tile__bg { position: absolute; inset: 0; background: linear-gradient(160deg, #3a3f52, #1f2230); opacity: 0.9; } .cat-tile__img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.85; }
        .cat-tile__name { position: relative; color: #fff; font-weight: 600; font-size: 1.02rem; transition: color 0.2s; }
        .cat-tile__arrow { position: relative; margin-left: auto; color: var(--gold); transform: translateX(-6px); opacity: 0; transition: all 0.2s; }
        .cat-tile:hover .cat-tile__name { color: var(--gold); }
        .cat-tile:hover .cat-tile__arrow { transform: translateX(0); opacity: 1; }
        @media (max-width: 720px) { .cat-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
    </div>
  );
}
