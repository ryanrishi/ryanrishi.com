import { Children, cloneElement, useState } from "react";
import Link from "next/Link";
import { useRouter } from "next/router";

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

const MobileNav = ({ isOpen }) => {
  // TODO integrate react-spring "trails" https://www.react-spring.io/docs/hooks/examples
  // see https://codesandbox.io/embed/zn2q57vn13
}

export default function Header() {
  const router = useRouter();
  const [isMobileNavOpen, setIsMobileNavOpen ] = useState(false);

  const handleClick = (href) => {
    setIsMobileNavOpen(false);
    router.push(href);
  }

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
