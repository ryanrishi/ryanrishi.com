import Link from 'next/link';

// see https://codesandbox.io/s/react-hamburger-menu-r7cxn?resolutionWidth=320&resolutionHeight=675&file=/src/components/Menu/Menu.styles.js
// see https://codesandbox.io/s/react-and-css-animated-responsive-navigation-bar-5h3v8?resolutionWidth=320&resolutionHeight=675&file=/src/index.js:387-398

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
