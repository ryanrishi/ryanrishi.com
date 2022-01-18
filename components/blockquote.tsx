import PropTypes from 'prop-types'
import React, { ReactNode } from 'react'

import Link from './link'

interface BlockquoteProps {
  children: ReactNode;
  name: string;
  citationLink: string;
}

export default function Quote({ children, name, citationLink }: BlockquoteProps) {
  return (
    <blockquote className="relative p-4 text-xl text-gray-600 quote italic mb-4 border-l-4 sm:border-l-0 dark:text-gray-200">
      <div
        className="font-serif text-8xl text-gray-200 absolute hidden sm:block top-0 dark:text-gray-600"
        style={{
          zIndex: -1,
        }}
        aria-hidden="true"
        >
        {/* TODO the quotation marks aren't showing up in dark mode— probz due to z-index? Might need to do :before */}
        &ldquo;
      </div>
      <div className="mb-4">{children}</div>
      {name && (
        <cite className="flex items-center">
          <div className="flex flex-col items-start">
            <span className="mb-1 text-sm text-gray-400 dark:text-gray-500">
              {citationLink ? <Link href={citationLink}>{name}</Link> : name}
            </span>
          </div>
        </cite>
      )}
    </blockquote>
  )
}

Quote.propTypes = {
  citationLink: PropTypes.string,
  name: PropTypes.string,
}

Quote.defaultProps = {
  citationLink: '',
  name: '',
}
