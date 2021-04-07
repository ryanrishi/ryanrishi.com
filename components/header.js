import { Squash as Hamburger } from 'hamburger-react';
import { useState } from 'react';
import { animated, useSpring, useTransition } from 'react-spring';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import Link from './link';

const AnimatedDialogOverlay = animated(DialogOverlay);

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
    className="italic uppercase font-bold mr-4"
  >
    {children}
  </Link>
);

function MobileNav({ isOpen, setIsOpen }) {
  const { top } = useSpring({
    top: isOpen ? '0' : '-100vh'
  });

  const itemTransitions = useTransition(items, { keys: (item) => item.href });

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="uppercase">Ryan&nbsp;<b>Rishi</b></div>
        <div className="z-40">
          {/* TODO put this on <Hamburger> but it's not picking up class name */}
          <Hamburger
            style={{
              zIndex: 40
            }}
            toggled={isOpen}
            toggle={setIsOpen}
          />
        </div>
      </div>
      <div>
        <AnimatedDialogOverlay
          className="bg-white"
          style={{ top }}
        >
          <DialogContent>
            {itemTransitions((itemStyle, { title, href }) => (
              <animated.div style={itemStyle}>
                <Link
                  className="uppercase italic font-bold"
                  key={href}
                  href={href}
                  invert
                >
                  {title}
                </Link>
              </animated.div>
            ))}
          </DialogContent>
        </AnimatedDialogOverlay>
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
