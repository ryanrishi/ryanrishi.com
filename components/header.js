import { Squash as Hamburger } from 'hamburger-react';
import { useState } from 'react';
import { animated, useTransition } from 'react-spring';
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
  const overlayTransitions = useTransition(isOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    expires: true
  });

  const itemTransitions = useTransition(isOpen ? [0, 1, 2, 3] : [], {
    trail: 30,
    from: { bottom: '-50vh' },
    enter: { bottom: '0vh' },
    leave: { bottom: '50vh' }
  });

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="uppercase text-xl">
          <Link
            href="/"
            invert
          >
            Ryan&nbsp;
            <b>Rishi</b>
          </Link>
        </div>
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
        {overlayTransitions((overlayStyles, item) => item && (
          <AnimatedDialogOverlay
            className="bg-white"
            style={overlayStyles}
          >
            <DialogContent
              aria-label="Menu"
              className="h-4/5"
            >
              {itemTransitions((style, i) => (
                <animated.div
                  key={items[i].href}
                  style={style}
                  className="my-16"
                >
                  <Link
                    href={items[i].href}
                    className="uppercase italic font-bold text-4xl my-4"
                    invert
                  >
                    {items[i].title}
                  </Link>
                </animated.div>
              ))}
            </DialogContent>
          </AnimatedDialogOverlay>
        ))}
      </div>
    </>
  );
}

export default function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <header className="flex flex-col md:flex-row justify-between p-4 md:py-8 container">
      <div className="md:hidden">
        <MobileNav
          isOpen={isMobileNavOpen}
          setIsOpen={setIsMobileNavOpen}
        />
      </div>
      <div className="hidden md:flex justify-between flex-row w-full">
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
