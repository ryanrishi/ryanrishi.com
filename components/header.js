import { Squash as Hamburger } from 'hamburger-react';
import { useState } from 'react';
import { animated, useChain, useSpring, useSpringRef, useTransition } from 'react-spring';
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
  const overlayRef = useSpringRef();
  const overlayStyles = useSpring({
    ref: overlayRef,
    bottom: isOpen ? '-100vh' : '100vh'
  });

  const itemRef = useSpringRef();
  const itemTransitions = useTransition(isOpen ? [0, 1, 2, 3] : [], {
    ref: itemRef,
    trail: 30,
    from: { opacity: 0, marginLeft: '-50vw' },
    enter: { opacity: 1, marginLeft: '0vw' },
    leave: { opacity: 0, marginLeft: '50vw' }
  });

  // TODO this doesn't seem to do anything - perhaps a bug in react-spring v9
  // see https://github.com/pmndrs/react-spring/issues/1388
  useChain(isOpen ? [overlayRef, itemRef] : [itemRef, overlayRef], [0, isOpen ? 0.1 : 0.6]);

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="uppercase text-xl">Ryan&nbsp;<b>Rishi</b></div>
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
      </div>
    </>
  );
}

export default function Header() {
  const [ isMobileNavOpen, setIsMobileNavOpen ] = useState(false);

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
