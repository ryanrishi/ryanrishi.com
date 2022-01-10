import { DialogContent,DialogOverlay } from '@reach/dialog'
import { Squash as Hamburger } from 'hamburger-react'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import { animated, useTransition } from 'react-spring'
import { HiMoon, HiOutlineSun } from 'react-icons/hi'

import Link from './link'
import Toggle from '../components/Toggle'

const AnimatedDialogOverlay = animated(DialogOverlay)

const items = [
  { title: 'Music', href: '/music' },
  { title: 'Projects', href: '/projects' },
  { title: 'Blog', href: '/blog' },
  { title: 'Contact', href: '/contact' },
]

function DarkModeToggle({ theme, setTheme }) {
  const [mounted, setMounted] = useState(false)

  // fix SSR hydration issues by returning early if not in client context
  // see https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <Toggle
      defaultChecked={theme === 'dark'}
      icons={{
        checked: <HiOutlineSun size={10} />,
        unchecked: <HiMoon color="white" size={10} />,
      }}
      onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    />
  )
}

const HeaderLink = ({ href, children }) => (
  <Link
    href={href}
    invert
    className="italic uppercase font-bold mr-4"
  >
    {children}
  </Link>
)

function MobileNav({ isOpen, setIsOpen }) {
  const overlayTransitions = useTransition(isOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    expires: true,
  })

  const itemTransitions = useTransition(isOpen ? [0, 1, 2, 3] : [], {
    trail: 30,
    from: { bottom: '-50vh' },
    enter: { bottom: '0vh' },
    leave: { bottom: '50vh' },
  })

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
          {/* check back when hamburger-react v3 is released: https://github.com/luukdv/hamburger-react/issues/45#issuecomment-902639087 */}
          <Hamburger
            toggled={isOpen}
            toggle={setIsOpen}
          />
        </div>
      </div>
      <div>
        {overlayTransitions((overlayStyles, item) => item && (
          <AnimatedDialogOverlay
            as={DialogOverlay}
            className="bg-white"
            style={overlayStyles}
          >
            <DialogContent
              aria-label="Menu"
              className="h-4/5 text-center px-0"
            >
              {itemTransitions((style, i) => (
                <animated.div
                  key={items[i].href}
                  style={style}
                  className="my-16"
                >
                  <Link
                    href={items[i].href}
                    className="uppercase italic font-bold text-4xl my-4 outline-white"
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
  )
}

export default function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <header className="max-w-4xl flex flex-col md:flex-row justify-between p-4 md:p-8 container">
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
          <DarkModeToggle
            theme={theme}
            setTheme={setTheme}
          />
        </nav>
      </div>
    </header>
  )
}
