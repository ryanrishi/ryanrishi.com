'use client'

import { Squash as Hamburger } from 'hamburger-react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi'
import { IconContext } from 'react-icons/lib'

import Logo from './logo'

const items = [
  { title: 'Music', href: '/music' },
  { title: 'Projects', href: '/projects' },
  { title: 'Blog', href: '/blog' },
  { title: 'Contact', href: '/contact' },
]

function DarkModeButton() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // avoid mismatch between SSR and CSR
  // see https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
  if (!mounted) return null

  return (
    <button
      aria-label="Dark mode toggle"
      className="rounded h-8 w-8 flex flex-row justify-center items-center bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-600 dark:text-slate-300 dark:hover:bg-slate-500 transition-colors"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      <IconContext.Provider  value={{ size: '16' }}>
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

function MobileNav({ isOpen, setIsOpen }) {
  return <>
    <div className="flex justify-between items-center">
      <div className="flex flex-row items-center dark:text-green-200">
        <Logo width={100 / 3} />
        <HeaderLink href="/">Ryan Rishi</HeaderLink>
      </div>
      <div className="z-40 flex flex-row items-center">
        <DarkModeButton />

        {/* TODO put this on <Hamburger> but it's not picking up class name */}
        {/* check back when hamburger-react v3 is released: https://github.com/luukdv/hamburger-react/issues/45#issuecomment-902639087 */}
        <Hamburger
          toggled={isOpen}
          toggle={setIsOpen}
        />
      </div>
    </div>
    <div>
      {items.map((item, i) => (
        <div
          key={item.href}
          className="my-8"
        >
          <Link
            href={item.href}
            className="uppercase italic font-bold text-4xl my-4 outline-white">
            {item.title}
          </Link>
        </div>
      ))}
    </div>
  </>
}

export default function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  return (
    <header className="max-w-4xl flex flex-col md:flex-row justify-between p-4 md:py-8 container dark:text-slate-50 transition">
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
