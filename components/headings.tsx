import classNames from 'classnames'
import { ReactNode } from 'react'

interface HeadingsProps {
  className?: string | string[];
  children: ReactNode;
}

const baseClassNames = 'italic uppercase font-bold text-gray-800 mb-2 lg:mb-6 mt-2 lg:mt-8 dark:text-gray-100 transition transition-color'

export function H1({ className, children }: HeadingsProps) {
  const classes = classNames(baseClassNames, className)
  return <h1 className={classes}>{children}</h1>
}

export function H2({ className, children }: HeadingsProps ) {
  const classes = classNames(baseClassNames, className)
  return <h2 className={classes}>{children}</h2>
}

export function H3({ className, children }: HeadingsProps) {
  const classes = classNames(baseClassNames, className)
  return <h3 className={classes}>{children}</h3>
}

export function H4({ className, children }: HeadingsProps) {
  const classes = classNames(baseClassNames, className)
  return <h4 className={classes}>{children}</h4>
}

export function H5({ className, children }: HeadingsProps) {
  const classes = classNames(baseClassNames, className)
  return <h5 className={classes}>{children}</h5>
}

export function H6({ className, children }: HeadingsProps) {
  const classes = classNames(baseClassNames, className)
  return <h6 className={classes}>{children}</h6>
}
