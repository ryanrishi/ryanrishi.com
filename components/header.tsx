import { DialogContent, DialogOverlay } from '@reach/dialog'
import { Squash as Hamburger } from 'hamburger-react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi'
import { IconContext } from 'react-icons/lib'
import { animated, useTransition } from 'react-spring'

const AnimatedDialogOverlay = animated(DialogOverlay)

const items = [
  { title: 'Home', href: '/' },
  { title: 'Music', href: '/music' },
  { title: 'Projects', href: '/projects' },
  { title: 'Blog', href: '/blog' },
  { title: 'Contact', href: '/contact' },
]

function DarkModeButton({ theme, setTheme }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // avoid mismatch between SSR and CSR
  // see https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
  if (!mounted) return null

  return (
    <button
      aria-label="Dark mode toggle"
      className="rounded h-8 w-8 flex flex-row justify-center items-center bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 focus:ring-2 dark:focus:ring-gray-500 transition"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <IconContext.Provider  value={{ size: '16', className: 'transition' }}>
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

  const itemTransitions = useTransition(isOpen ? items.map((_, i) => i) : [], {
    trail: 30,
    from: { bottom: '-50vh' },
    enter: { bottom: '0vh' },
    leave: { bottom: '50vh' },
  })

  return (
    <>
      <div className="flex justify-end">
        <div className="z-40 flex flex-row items-center">
          <DarkModeButton
            theme={theme}
            setTheme={setTheme}
          />

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
    <header className="max-w-4xl flex flex-col md:flex-row justify-between p-4 md:py-8 container dark:text-gray-50 transition">
      <div className="md:hidden">
        <MobileNav
          isOpen={isMobileNavOpen}
          setIsOpen={setIsMobileNavOpen}
          theme={theme}
          setTheme={setTheme}
        />
      </div>
      <nav className="hidden md:flex flex-row justify-between items-center w-full">
        <div>
          {items.map(({ title, href }) => (
            <HeaderLink
              key={href}
              href={href}
            >
              {title}
            </HeaderLink>
          ))}
        </div>
        <DarkModeButton
          theme={theme}
          setTheme={setTheme}
        />
      </nav>
    </header>
  )
}
