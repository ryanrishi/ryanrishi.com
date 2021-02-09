import { Children, cloneElement, useState, useRef } from "react";
import Link from "next/Link";
import { useRouter } from "next/router";
import { animated, useChain, useTrail, useTransition } from "react-spring";
import { DialogOverlay, DialogContent } from "@reach/dialog";

const AnimatedDialogOverlay = animated(DialogOverlay);

const NavLink = ({ children, ...props }) => {
  const { asPath } = useRouter();
  const child = Children.only(children);
  const baseClassNames = "ml-6 -mb-px text-gray-600 border-b border-transparent xl:pb-6 lg:ml-8 lg:text-base xl:text-lg hover:text-gray-900";
  const isActive = props.href === asPath;
  const activeClassNames = "text-gray-900";
  const className = isActive ? `${baseClassNames} ${activeClassNames}`.trim() : baseClassNames;

  return (
    <Link {...props}>
      {cloneElement(child, { className })}
    </Link>
  );
}

const MobileNavButton = ({ isOpen, setIsOpen }) => {
  return (
    <div className="md:hidden">
      <button type="button" className="mobile-nav-button" onClick={() => setIsOpen(!isOpen)}>
        <svg className="fill-current" viewBox="0 0 24 24">
          <path className="hidden" d="M16.24 14.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 0 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12l2.83 2.83z" />
          <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
        </svg>
      </button>
    </div>
  );
}

const MobileNav = ({ isOpen, closeMenu }) => {
  const overlayRef = useRef();
  const overlayTransitions = useTransition(isOpen, null, {
    ref: overlayRef,
    config: {
      mass: 1,
      tension: 200,
      friction: 20
    },
    from: { height: 0 },
    leave: { height: 0 },
    enter: { height: 900 } // TODO not this
  });

  const items = [
    { href: '/music', title: 'Music' },
    { href: '/projects', title: 'Projects'},
    { href: '/blog', title: 'Blog' }
  ];

  const contentRef = useRef();
  const trail = useTrail(items.length, {
    ref: contentRef,
    config: {
      mass: 5,
      tension: 2000,
      friction: 200
    },
    opacity: isOpen ? 1 : 0,
    x: isOpen ? 0 : 20,
    height: isOpen ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 }
  });

  useChain(isOpen ? [contentRef, overlayRef] : [overlayRef, contentRef], [0, isOpen ? 0 : 0.1]);

  return (
    <>
      {overlayTransitions.map(({ item, key, props }) =>
        item && (
          <AnimatedDialogOverlay
            key={key}
            className={`md:hidden flex items-center justify-center bg-white ${isOpen ? "" : "pointer-events-none"}`}
            style={{ height: props.height }}
            onDismiss={closeMenu}>
            <DialogContent
              className="w-full max-w-lg p-4 m-4 mx-auto bg-transparent"
              aria-label="Site navigation">
              {trail.map(({ x, height, ...rest }, index) =>
                <animated.div
                  className="text-black text-5xl font-extrabold relative"
                  key={items[index].href}
                  style={{ transform: x.interpolate(x => `translate3d(0, ${x}px, 0)`), height, ...rest }}>
                  <Link href={items[index].href} style={height}>
                    <a className="block w-auto">
                      {items[index].title}
                    </a>
                  </Link>
                </animated.div>
              )}
            </DialogContent>
          </AnimatedDialogOverlay>
        )
      )}
    </>
  );
}

export default function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-logo">
        <a className="header-link" href="/">Ryan Rishi</a>
      </div>
      <MobileNavButton
        isOpen={isMobileNavOpen}
        setIsOpen={setIsMobileNavOpen} />
      <nav className="hidden md:flex">
        <ul className="header-nav">
          <li className="header-item">
            <Link href="/music">
              <a className="header-link" href="/music">Music</a>
            </Link>
          </li>
          <li className="header-item">
            <Link href="/projects">
              <a className="header-link" href="/projects">Projects</a>
            </Link>
          </li>
          <li className="header-item">
            <Link href="/blog">
              <a className="header-link" href="/blog">Blog</a>
            </Link>
          </li>
          <li className="header-item">
            <Link href="https://github.com/ryanrishi">
              <a className="header-link" href="https://github.com/ryanrishi">Github</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
