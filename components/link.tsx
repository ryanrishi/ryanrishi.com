import classNames from 'classnames'
import NextLink from 'next/link'
import PropTypes from 'prop-types'
import { ReactNode } from 'react'

interface LinkProps {
  children: ReactNode;
  href: string;
  className: string;
  invert?: boolean;
}

export default function Link({ href, children, className, invert = false }: LinkProps) {
  const isInternalLink = href?.startsWith('/')

  const classes = classNames('transition text-green-800 hover:text-green-900 border-b border-b-green-400 bg-green-200 hover:bg-green-300 rounded-sm', className)

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
