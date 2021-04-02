import Link from 'next/link';

const HeaderLink = ({ href, children }) => (
  <Link href={href}>
    <a className="italic uppercase font-bold hover:text-primary mr-4 hover:text-green-700 transition">{children}</a>
  </Link>
);

export default function Header() {
  const items = [
    { title: 'Music', href: '/music' },
    { title: 'Projects', href: '/projects' },
    { title: 'Blog', href: '/blog' },
    { title: 'Github', href: 'https://github.com/ryanrishi' }
  ];

  return (
    <header className="flex flex-col md:flex-row justify-between py-8 container">
      <div className="text-lg">
        <HeaderLink
          href="/"
        >
          Ryan Rishi
        </HeaderLink>
      </div>
      <nav className="header-nav">
        {items.map(({ title, href }) => (
          <HeaderLink
            key={href}
            href={href}
          >
            {title}
          </HeaderLink>
        ))}
      </nav>
    </header>
  );
}
