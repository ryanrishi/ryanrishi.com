import Link from 'next/link';

export default function Header() {
  const items = [
    { title: 'Music', href: '/music' },
    { title: 'Projects', href: '/projects' },
    { title: 'Blog', href: '/blog' },
    { title: 'Github', href: 'https://github.com/ryanrishi' }
  ];

  return (
    <Navbar>
      <NavbarLogo>Ryan Rishi</NavbarLogo>
      <NavbarItems>
        {items.map((item) => (
          <NavbarItem key={item.href}>
            <Link href={item.href}>{item.title}</Link>
          </NavbarItem>
        ))}
      </NavbarItems>
    </Navbar>
  );
}

function Navbar({ children }) {
  return <nav className="navbar">{children}</nav>;
}

function NavbarLogo({ children }) {
  return <h1 className="title">{children}</h1>;
}

function NavbarItems({ children }) {
  return <ul className="items">{children}</ul>;
}

function NavbarItem({ children }) {
  return <li className="item">{children}</li>;
}
