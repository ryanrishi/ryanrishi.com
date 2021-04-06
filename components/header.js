import { Squash as Hamburger } from 'hamburger-react';
import { useState } from 'react';
import Link from './link';

const items = [
  { title: 'Music', href: '/music' },
  { title: 'Projects', href: '/projects' },
  { title: 'Blog', href: '/blog' },
  { title: 'Github', href: 'https://github.com/ryanrishi' }
];

const HeaderLink = ({ href, children }) => (
  <Link
    href={href}
    invert
    classNames="italic uppercase font-bold mr-4"
  >
    {children}
  </Link>
);

function MobileNav({ isOpen, setIsOpen }) {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="uppercase">Ryan&nbsp;<b>Rishi</b></div>
        <Hamburger
          toggled={isOpen}
          toggle={setIsOpen}
        />
      </div>
      <div>
        {isOpen && items.map(({ title, href }) => (
          <Link href={href} key={href}>{title}</Link>
        ))}
      </div>
    </>
  );
}

export default function Header() {
  const [ isMobileNavOpen, setIsMobileNavOpen ] = useState(false);

  return (
    <header className="flex flex-col md:flex-row justify-between p-2 md:py-8 container">
      <div className="md:hidden">
        <MobileNav
          isOpen={isMobileNavOpen}
          setIsOpen={setIsMobileNavOpen}
        />
      </div>
      <div className="hidden md:flex flex-col">
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
      </div>
    </header>
  );
}
