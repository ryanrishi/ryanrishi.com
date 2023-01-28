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
    <blockquote className="relative p-4 text-xl text-slate-600 quote italic mb-4 border-l-4 border-slate-200 dark:border-slate-700 dark:text-slate-200">
      <div className="mb-4">{children}</div>
      {name && (
        <cite className="flex items-center">
          <div className="flex flex-col items-start">
            <span className="mb-1 text-sm text-slate-400 dark:text-slate-500">
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
