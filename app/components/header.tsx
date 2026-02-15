'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Squash as Hamburger } from 'hamburger-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Dispatch, SetStateAction, useEffect, useState, useSyncExternalStore } from 'react'
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi'
import { ImGithub, ImLinkedin, ImSoundcloud, ImTwitter, ImYoutube } from 'react-icons/im'
import { IconContext } from 'react-icons/lib'

import { useDisableBodyScroll } from '@/hooks'

import Logo from './logo'

const items = [
  { title: 'Music', href: '/music' },
  { title: 'Projects', href: '/projects' },
  { title: 'Blog', href: '/blog' },
  { title: 'Contact', href: '/contact' },
]

const subscribe = () => () => {}

function DarkModeButton() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(subscribe, () => true, () => false)

  if (!mounted) return null

  return (
    <button
      aria-label="Dark mode toggle"
      className="rounded h-8 w-8 flex flex-row justify-center items-center bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-600 dark:text-slate-300 dark:hover:bg-slate-500 bg-opacity-75 transition-colors"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      <IconContext.Provider value={{ size: '16' }}>
        {resolvedTheme === 'dark' ? <HiOutlineSun /> : <HiOutlineMoon />}
      </IconContext.Provider>
    </button>
  )
}

const HeaderLink = ({ className = '', href, children }) => (
  <Link href={href} className={`italic uppercase font-bold mx-2 ${className}`}>
    {children}
  </Link>
)

function MobileNavItem({ item, index, isExiting, pathname }: {
  item: { title: string; href: string },
  index: number,
  isExiting: boolean,
  pathname: string
}) {
  const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))

  return (
    <motion.li
      variants={{
        open: {
          x: 0,
          opacity: 1,
          transition: {
            type: 'spring',
            bounce: 0.3,
            duration: 0.6,
            delay: index * 0.1,
          },
        },
        closed: {
          x: isExiting ? 100 : -100,
          opacity: 0,
          transition: {
            type: 'spring',
            bounce: 0.3,
            duration: 0.4,
            delay: isExiting ? (3 - index) * 0.08 : 0,
          },
        },
      }}
      initial="closed"
      animate="open"
      exit="closed"
      className="overflow-visible"
    >
      <Link
        href={item.href}
        className={`block text-5xl font-bold tracking-tight leading-tight transition-all duration-200 ${
          isActive
            ? 'text-white'
            : 'text-slate-100 hover:text-white'
        }`}
      >
        {item.title}
      </Link>
    </motion.li>
  )
}

function MobileNav({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>> }) {
  const pathname = usePathname()
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen)
  const [pathnameOnOpen, setPathnameOnOpen] = useState(pathname)

  if (isOpen && !prevIsOpen) {
    setPrevIsOpen(true)
    setPathnameOnOpen(pathname)
  }
  if (!isOpen && prevIsOpen) {
    setPrevIsOpen(false)
  }

  const isExiting = isOpen && pathname !== pathnameOnOpen

  useEffect(() => {
    if (isExiting) {
      const timeout = setTimeout(() => {
        setIsOpen(false)
      }, 200)
      return () => clearTimeout(timeout)
    }
  }, [isExiting, setIsOpen])

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex flex-row items-center dark:text-green-200">
          <Logo width={100 / 3} />
          <HeaderLink href="/">Ryan Rishi</HeaderLink>
        </div>
        <div className="z-50 flex flex-row items-center gap-2">
          <DarkModeButton />
          <div data-testid="hamburger-menu">
            <Hamburger
              toggled={isOpen}
              toggle={setIsOpen}
              size={20}
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-md z-30"
              data-testid="mobile-nav-backdrop"
            />

            {/* Menu Panel */}
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                type: 'spring',
                bounce: 0.2,
                duration: 0.6,
              }}
              className="fixed top-0 right-0 h-full w-full bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-900 dark:to-black z-30 flex flex-col justify-center items-center px-8 text-white"
            >
              {/* Main Navigation */}
              <motion.ul
                className="space-y-6 mb-16"
                initial={false}
                animate={isOpen ? 'open' : 'closed'}
              >
                {[{ title: 'Home', href: '/' }, ...items].map((item, index) => (
                  <MobileNavItem
                    key={item.href}
                    item={item}
                    index={index}
                    isExiting={isExiting}
                    pathname={pathname}
                  />
                ))}
              </motion.ul>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                exit={{ scaleX: 0, opacity: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="w-24 h-px bg-slate-400 dark:bg-slate-600 mb-12"
              />

              {/* Social Links */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="flex items-center gap-x-6 text-2xl text-slate-300 dark:text-slate-400"
              >
                {[
                  { href: 'https://github.com/ryanrishi', icon: ImGithub, label: 'GitHub' },
                  { href: 'https://twitter.com/ryanrishi', icon: ImTwitter, label: 'Twitter' },
                  { href: 'https://linkedin.com/in/ryanrishi', icon: ImLinkedin, label: 'LinkedIn' },
                  { href: 'https://soundcloud.com/ryanrishi', icon: ImSoundcloud, label: 'SoundCloud' },
                  { href: 'https://youtube.com/RyanRishiPercussion', icon: ImYoutube, label: 'YouTube' },
                ].map(({ href, icon: Icon, label }) => (
                  <motion.a
                    key={href}
                    href={href}
                    aria-label={label}
                    className="hover:text-slate-100 dark:hover:text-slate-200 transition-colors duration-200 hover:scale-110"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const pathname = usePathname()


  useDisableBodyScroll(isMobileNavOpen)

  // hide this page on links page
  // this is yet another hack around server components since usePathname is a client-side hook
  if (pathname === '/links') {
    return null
  }

  return (
    <header className="max-w-4xl flex flex-col md:flex-row justify-between p-4 md:py-8 container mx-auto dark:text-slate-50 relative z-10 transition">
      <div className="md:hidden">
        <MobileNav
          isOpen={isMobileNavOpen}
          setIsOpen={setIsMobileNavOpen}
        />
      </div>
      <nav className="hidden md:flex flex-row justify-between items-center w-full">
        <div className="flex flex-row items-center dark:text-green-200">
          <Logo width={100 / 3} />
          <HeaderLink href="/" className="ml-4">Ryan Rishi</HeaderLink>
        </div>
        <div className="flex flex-row items-center">
          {items.map(({ title, href }) => (
            <HeaderLink
              key={href}
              href={href}
            >
              {title}
            </HeaderLink>
          ))}
          <DarkModeButton />
        </div>
      </nav>
    </header>
  )
}
