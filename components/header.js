import { Children, cloneElement, useState, useRef } from "react";
import Link from "next/Link";
import { useRouter } from "next/router";
import { animated, useTransition, useTrail, a } from "react-spring";
import { DialogOverlay, DialogContent } from "@reach/dialog";

const AnimatedDialogOverlay = animated(DialogOverlay);

const NavLink = ({ children, ...props }) => {
  const { asPath } = useRouter();
  const child = Children.only(children);
  const baseClassNames = "pb-4 ml-6 -mb-px text-gray-600 border-b border-transparent xl:pb-6 lg:ml-8 lg:text-base xl:text-lg hover:text-gray-900";
  const isActive = props.href === asPath;
  const activeClassNames = "text-gray-900";
  const className = isActive ? `${baseClassNames} ${activeClassNames}`.trim() : baseClassNames;

  return (
    <Link {...props}>
      {cloneElement(child, { className })}
      {/* <a className="pb-4 ml-6 -mb-px text-gray-600 border-b border-transparent xl:pb-6 lg:ml-8 lg:text-base xl:text-lg hover:text-gray-900" href="/work-journal">Work journal</a>
      <a className="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2">Music</a> */}
    </Link>
  );
}

// const Trail = ({ open, children, ...props }) => {
//   const items = React.Children.toArray(children)
//   const trail = useTrail(items.length, {
//     config: { mass: 5, tension: 2000, friction: 200 },
//     opacity: open ? 1 : 0,
//     x: open ? 0 : 20,
//     height: open ? 110 : 0,
//     from: { opacity: 0, x: 20, height: 0 },
//   });

//   return (
//     <div className="trails-main" {...props}>
//       <div>
//         {trail.map(({ x, height, ...rest }, index) => (
//           <a.div
//             key={items[index]}
//             className="trails-text"
//             style={{ ...rest, transform: x.interpolate((x) => `translate3d(0, ${x}px, 0)`) }}>
//             <a.div style={{ height }}>{items[index]}</a.div>
//           </a.div>
//         ))}
//       </div>
//     </div>
//   );
// }

const MobileNavButton = ({ isOpen, setIsOpen }) => {
  return (
    <div className="md:hidden">
      <button type="button" className="block text-gray-800 hover:text-gray-700 focus:text-gray-700 focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
          <path className="hidden" d="M16.24 14.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 0 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12l2.83 2.83z" />
          <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
        </svg>
      </button>
    </div>
  );
}

const MobileNav = ({ isOpen, closeMenu }) => {
  // TODO integrate react-spring "trails" https://www.react-spring.io/docs/hooks/examples
  // see https://codesandbox.io/embed/zn2q57vn13

  const items = [
    { href: '/music', title: 'Music' },
    { href: '/projects', title: 'Projects'}
  ];

  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: isOpen ? 1 : 0,
    x: isOpen ? 0 : 20,
    height: isOpen ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 }
  });

  const MobileNavItem = ({ children }) => {
    const child = Children.only(children);

    return (
      <div className="text-red-600">
        {child}
      </div>
    );
  };

  // console.error(trail);

  return (
    <div className="md:hidden">
      {trail.map(({ x, height, ...rest }, index) =>
        items[index] && (
          // <div className="text-green-600">{index}</div>
          // <>
          <AnimatedDialogOverlay
            className={isOpen ? "" : "pointer-events-none"}
            key={items[index].title}
            style={{ ...rest, transform: x.interpolate(x => `translate3d(9, ${x}px, 0)` )}}>
            <DialogContent className="w-full max-w-lg p-4 m-4 mx-auto bg-transparent"
              aria-label="Site navigation">
                <button>{items[index].title}</button>
              </DialogContent>
            </AnimatedDialogOverlay>
          // </>
        )
        // <a.div
        //   key={items[index].title}
        //   className="trails-text"
        //   style={{ ...rest, transform: x.interpolate((x) => `translate3d(0, ${x}px, 0)`) }}>
        //   <a.div style={{ height }}>{items[index]}</a.div>
        // </a.div>
      )}
      {/* <AnimatedDialogOverlay
        className={isOpen ? "" : "pointer-events-none"}
        key="test"
        onDismiss={closeMenu}>
          <DialogContent className="w-full max-w-lg p-4 m-4 mx-auto bg-transparent"
          aria-label="Site navigation">
            <button onClick={closeMenu} className="flex flex-wrap focus:outline-none">
            </button>
          </DialogContent>
        </AnimatedDialogOverlay> */}
        {/* {trail.map(({ item, key, x, height, ...rest }, index) => (
          item && (
            <>
          <a.div
            key={`${key}${index}`}
            className="trails-text"
            style={{ ...rest, transform: x.interpolate((x) => `translate3d(0, ${x}px, 0)`) }}>
            <a.div style={{ height }}>{key}</a.div>
          </a.div>
          </>
          )
        ))} */}
    </div>
  );

  return (
    <div className="md:hidden">
      {trail.map(
        ({ item, key, props }) =>
          item && (
            <AnimatedDialogOverlay
              className={isOpen ? "" : "pointer-events-none"}
              key={key}
              // style={{
              //   backdropFilter: props.blur.interpolate((v) => `blur(${v}px)`),
              //   WebkitBackdropFilter: props.blur.interpolate(
              //     (v) => `blur(${v}px)`
              //   ),
              //   background: props.alpha.interpolate(
              //     (v) => `rgba(120, 120, 120, ${v})`
              //   ),
              // }}
              onDismiss={closeMenu}
            >
              {transitions.length > 0 && (
                <DialogContent
                  className="w-full max-w-lg p-4 m-0 mx-auto bg-transparent"
                  aria-label="Site nav"
                >
                  <button
                    onClick={closeMenu}
                    className="flex flex-wrap focus:outline-none"
                    style={{
                      WebkitTapHighlightColor: "transparent",
                    }}
                  >
                    <div className="w-1/3 px-2 mt-4">
                      <MobileNavItem>
                        <Link href="/music">Music</Link>
                      </MobileNavItem>
                      <div>1</div>
                      <div>2</div>
                      <div>3</div>
                      <div>4</div>
                      <div>5</div>
                    </div>
                  </button>
                </DialogContent>
              )}
            </AnimatedDialogOverlay>
          )
      )}
    </div>
  );
}

export default function Header() {
  const router = useRouter();
  const [ isMobileNavOpen, setIsMobileNavOpen ] = useState(false);

  // const handleClick = (href) => {
  //   setIsMobileNavOpen(false);
  //   router.push(href);
  // }

  return (
    <div className="w-full">
      <nav className="bg-white shadow-lg">
        <div className="md:flex items-center justify-between py-2 px-8 md:px-12">
          <div className="flex justify-between items-center">
            <a className="text-sm font-light tracking-wide uppercase md:text-base lg:text-xl" href="/">Ryan&nbsp;<span className="font-bold">Rishi</span></a>
            <MobileNavButton
              isOpen={isMobileNavOpen}
              setIsOpen={setIsMobileNavOpen} />
          </div>
          <MobileNav
            isOpen={isMobileNavOpen}
            // handleClick={handleClick}
            closeMenu={() => setIsMobileNavOpen(false)} />
          <div className="flex flex-col md:flex-row hidden md:block -mx-2">
            <NavLink href="/music">
              <a>Music</a>
            </NavLink>
            <NavLink href="/projects">
              <a>Projects</a>
            </NavLink>
            <NavLink href="/blog">
              <a>Blog</a>
            </NavLink>
            <NavLink href="/Github">
              <a>Github</a>
            </NavLink>
            {/* <Link href="/music" >
              <a className="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2">Music</a>
            </Link>
            <Link href="/projects">
              <a href="#" className="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2">Projects</a>
            </Link>
            <Link href="/blog">
              <a href="#" className="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2">Blog</a>
            </Link>
            <Link href="https://github.com/ryanrishi">
              <a href="#" className="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2">Github</a>
            </Link> */}
          </div>
        </div>
      </nav>
    </div>
  );
}
