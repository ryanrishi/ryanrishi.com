import { DialogContent, DialogOverlay } from '@reach/dialog'
import { Squash as Hamburger } from 'hamburger-react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi'
import { IconContext } from 'react-icons/lib'
import { animated, useTransition } from 'react-spring'

const AnimatedDialogOverlay = animated(DialogOverlay)

const items = [
  { title: 'Music', href: '/music' },
  { title: 'Projects', href: '/projects' },
  { title: 'Blog', href: '/blog' },
  { title: 'Contact', href: '/contact' },
]

function DarkModeButton({ theme, setTheme }) {
  return (
    <button
      aria-label="Dark mode toggle"
      className="rounded h-8 w-8 flex flex-row justify-center items-center bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 transition"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <IconContext.Provider  value={{ size: 16, className: 'transition' }}>
        {theme === 'dark' ? <HiOutlineSun /> : <HiOutlineMoon />}
      </IconContext.Provider>
    </button>
  )
}

const HeaderLink = ({ href, children }) => (
  <Link href={href}>
    <a className="italic uppercase font-bold mr-4">
      {children}
    </a>
  </Link>
)

function MobileNav({ isOpen, setIsOpen, theme, setTheme }) {
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
          <Link href="/">
            <>
              Ryan&nbsp;
              <b>Rishi</b>
            </>
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
            className="bg-white dark:bg-gray-900 transition-colors"
            style={overlayStyles}
          >
            <DialogContent
              aria-label="Menu"
              className="h-4/5 text-center px-0 dark:bg-gray-900 transition flex flex-col"
            >
              {itemTransitions((style, i) => (
                <animated.div
                  key={items[i].href}
                  style={style}
                  className="my-8"
                >
                  <Link href={items[i].href}>
                    <a className="uppercase italic font-bold text-4xl my-4 outline-white">
                      {items[i].title}
                    </a>
                  </Link>
                </animated.div>
              ))}
              <DarkModeButton
                theme={theme}
                setTheme={setTheme}
              />
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
    <header className="max-w-4xl flex flex-col md:flex-row justify-between p-4 md:p-8 container dark:text-gray-50 transition">
      <div className="md:hidden">
        <MobileNav
          isOpen={isMobileNavOpen}
          setIsOpen={setIsMobileNavOpen}
          theme={theme}
          setTheme={setTheme}
        />
      </div>
      <div className="hidden md:flex justify-between flex-row w-full">
        <div className="text-lg">
          <HeaderLink href="/">
            Ryan Rishi
          </HeaderLink>
        </div>
        <nav className="header-nav flex items-center">
          {items.map(({ title, href }) => (
            <HeaderLink
              key={href}
              href={href}
            >
              {title}
            </HeaderLink>
          ))}
          <DarkModeButton
            theme={theme}
            setTheme={setTheme}
          />
        </nav>
      </div>
    </header>
  )
}
