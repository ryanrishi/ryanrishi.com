import Link from 'next/link';

export default function Header() {
  const items = [
    { title: 'Music', href: '/music' },
    { title: 'Projects', href: '/projects' },
    { title: 'Blog', href: '/blog' },
    { title: 'Github', href: 'https://github.com/ryanrishi' }
  ];

  return (
    <header className="header">
      <div className="header-logo">
        <Link className="header-item" href="/">
          <a className="header-link" href="/">Ryan Rishi</a>
        </Link>
      </div>
      <nav className="header-nav">
        {items.map(({ title, href }) => (
          <Link key={href} href={href} className="header-item">
            <a className="header-link" href={href}>{title}</a>
          </Link>
        ))}
      </nav>
    </header>
  );
}
