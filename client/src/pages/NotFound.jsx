import { Link } from 'react-router-dom';
export default function NotFound() {
  return (
    <div className="container section">
      <h1>Page not found</h1>
      <p>The page you were looking for does not exist. <Link to="/" style={{ color: 'var(--gold)' }}>Go home &rarr;</Link></p>
    </div>
  );
}