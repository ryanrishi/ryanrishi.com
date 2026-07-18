import classNames from 'classnames'
import { Metadata } from 'next/types'

import { FancyH1 } from '@/components/headings'

export const metadata: Metadata = {
  title: 'Contact',
  openGraph: {
    title: 'Contact',
  },
  twitter: {
    title: 'Contact',
  },
}

const sharedInputClassNames = 'block w-full border rounded py-3 px-4 mb-3 mt-2 leading-tight appearance-none text-slate-800 bg-slate-100 dark:text-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 focus:border-valencia-500 focus:outline-none focus:ring-1 focus:ring-valencia-500 transition'

function Label({ htmlFor, children }) {
  return (
    <label
      className="block font-mono uppercase tracking-wide text-slate-600 dark:text-slate-400 text-xs mb-2"
      htmlFor={htmlFor}
    >
      {children}
    </label>
  )
}

export default function Contact() {
  return (
    <div className="w-full max-w-screen-xl">
      <FancyH1>Contact</FancyH1>
      <p className="mb-8 max-w-prose text-slate-600 dark:text-slate-400">
        Have a question, an idea, or just want to talk shop or music? Drop me a note below and I&apos;ll get back to you.
      </p>
      <form
        className="mx-auto"
        action="https://formspree.io/f/mleppawq"
        method="POST"
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <Label htmlFor="name">
              Name
              <input
                type="text"
                id="name"
                name="name"
                className={sharedInputClassNames}
                required
              />
            </Label>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <Label htmlFor="email">
              Email
              <input
                id="email"
                type="email"
                name="email"
                className={sharedInputClassNames}
                required
              />
            </Label>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <Label htmlFor="message">
              Message
              <textarea
                id="message"
                name="message"
                className={classNames(sharedInputClassNames, "h-48 resize-none")}
                required
              />
            </Label>
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3">
            <button
              type="submit"
              className="rounded bg-valencia-500 hover:bg-valencia-600 text-white font-mono text-sm py-2 px-5 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-valencia-400 dark:focus:ring-valencia-500"
            >
              Send
            </button>
          </div>
          <div className="md:w-2/3" />
        </div>
      </form>
    </div>
  )
}
