import classNames from 'classnames'

import Head from '../components/head'
import { FancyH1 } from '../components/headings'
import Layout from '../components/layout'

function Label({ htmlFor, children }) {
  return (
    <label
      className="block uppercase tracking-wide text-slate-600 dark:text-slate-300 text-xs font-bold mb-2"
      htmlFor={htmlFor}
    >
      {children}
    </label>
  )
}

const sharedInputClassNames = "block w-full border rounded py-3 px-4 mb-3 mt-2 leading-tight appearance-none text-slate-800 dark:text-slate-100 dark:bg-slate-800 border-slate-300 hover:border-slate-400 transition"

export default function Contact() {
  return (
    <Layout>
      <Head
        title="Contact"
      />
      <div className="container w-full md:w-3/4">
        <FancyH1>Contact</FancyH1>
        <form
          className="mx-auto"
          action="https://formspree.io/f/mleppawq"
          method="POST"
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <Label htmlFor="grid-full-name">
                Your Name
                <input
                  type="text"
                  id="grid-full-name"
                  name="name"
                  className={sharedInputClassNames}
                  required
                />
              </Label>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <Label htmlFor="grid-password">
                E-mail
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
              <Label htmlFor="grid-password">
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
                className="shadow bg-teal-500 hover:bg-teal-600 dark:bg-teal-700 dark:hover:bg-teal-800 transition focus:shadow-outline text-teal-50 dark:text-teal-50 font-semibold py-2 px-4 uppercase italic rounded"
              >
                Send
              </button>
            </div>
            <div className="md:w-2/3" />
          </div>
        </form>
      </div>
    </Layout>
  )
}
