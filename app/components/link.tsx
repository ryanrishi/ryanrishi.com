import NextLink from 'next/link'
import { ReactNode } from 'react'

interface LinkProps {
  children: ReactNode;
  href: string;
  className?: string;
}

const className = 'underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700 dark:decoration-neutral-600 dark:hover:decoration-neutral-400'

export default function Link({ href, children, ...props }: LinkProps) {
  const isInternalLink = href?.startsWith('/') || href?.startsWith('#')

  if (isInternalLink) {
    return (
      <NextLink className={className} href={href} {...props}>
        {children}
      </NextLink>
    )
  }

  return (
    <a
      href={href}
      {...props}
      className={className}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  )
}
