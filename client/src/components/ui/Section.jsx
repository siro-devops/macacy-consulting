export default function Section({ id, dark, tight, children, className = '' }) {
  const cls = `section ${tight ? 'section--tight' : ''} ${dark ? 'section--dark' : ''} ${className}`;
  return <section id={id} className={cls}><div className="container">{children}</div></section>;
}