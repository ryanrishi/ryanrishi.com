import { useState } from 'react';
import Link from 'next/link';
import { Fade as Hamburger } from 'hamburger-react';
import { DialogOverlay, DialogContent } from '@reach/dialog';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const items = [
    { title: 'Music', href: '/music' },
    { title: 'Projects', href: '/projects' },
    { title: 'Blog', href: '/blog' },
    { title: 'Github', href: 'https://github.com/ryanrishi' }
  ];

  return (
    <MobileNav
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      {items.map((item) => (
        <h3 key={item.href}>
          <Link href={item.href}>{item.title}</Link>
        </h3>
      ))}
    </MobileNav>
  );
}

function MobileNav({ isOpen, setIsOpen, children }) {
  return (
    <Navbar>
      <NavbarLogo>Ryan <b>Rishi</b></NavbarLogo>
      <Hamburger
        toggled={isOpen}
        toggle={setIsOpen}
      />
      {isOpen && (
        <DialogOverlay
          style={{ background: 'white' }}
        >
          <DialogContent
            style={{ width: '100vh' }}
          >
            <NavbarItems>
              {children}
            </NavbarItems>
          </DialogContent>
        </DialogOverlay>
      )}
    </Navbar>
  );
}

function Navbar({ children }) {
  return <nav className="navbar">{children}</nav>;
}

function NavbarLogo({ children }) {
  return <p className="title">{children}</p>;
}

function NavbarItems({ children }) {
  return <div className="items">{children}</div>;
}
