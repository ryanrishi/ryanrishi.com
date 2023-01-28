import classNames from 'classnames'
import NextLink from 'next/link'
import PropTypes from 'prop-types'
import { ReactNode } from 'react'

interface LinkProps {
  children: ReactNode;
  href: string;
  className: string;
}

export default function Link({ href, children, className }: LinkProps) {
  const isInternalLink = href?.startsWith('/')

  const classes = classNames('text-green-800 hover:text-green-900 border-b border-b-green-400 bg-green-200/50 hover:bg-green-200/80 dark:bg-green-800/50 dark:text-green-200 dark:hover:text-green-300 rounded-sm transition-colors', className)

  if (isInternalLink) {
    return (
      <NextLink href={href}>
        <a className={classes}>
          {children}
        </a>
      </NextLink>
    )
  }

  return (
    <a
      href={href}
      className={classes}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  )
}

Link.propTypes = {
  className: PropTypes.string,
}

Link.defaultProps = {
  className: null,
}
