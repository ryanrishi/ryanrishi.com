import classNames from 'classnames'
import { ReactNode } from 'react'

interface HeadingsProps {
  className?: string | string[]
  id?: string
  children: ReactNode
}

const baseClassNames = 'font-semibold text-gray-800 mb-2 lg:mb-6 mt-2 lg:mt-8 dark:text-gray-100 transition'

export function H1({ className, children, ...props }: HeadingsProps) {
  const classes = classNames(baseClassNames, className)
  return <h1 className={classes} {...props}>{children}</h1>
}

export function H2({ className, children, ...props }: HeadingsProps ) {
  const classes = classNames(baseClassNames, className)
  return <h2 className={classes} {...props}>{children}</h2>
}

export function H3({ className, children, ...props }: HeadingsProps) {
  const classes = classNames(baseClassNames, className)
  return <h3 className={classes} {...props}>{children}</h3>
}

export function H4({ className, children, ...props }: HeadingsProps) {
  const classes = classNames(baseClassNames, className)
  return <h4 className={classes} {...props}>{children}</h4>
}

export function H5({ className, children, ...props }: HeadingsProps) {
  const classes = classNames(baseClassNames, className)
  return <h5 className={classes} {...props}>{children}</h5>
}

export function H6({ className, children, ...props }: HeadingsProps) {
  const classes = classNames(baseClassNames, className)
  return <h6 className={classes} {...props}>{children}</h6>
}

export function FancyH1({ children }) {
  return <h1 className="text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[#00cc99] to-[#6600ff] pb-4">{`${children?.replace(/\.$/, '')}.`}</h1>
}
