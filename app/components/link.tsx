import NextLink from 'next/link'
import { ReactNode } from 'react'

interface LinkProps {
  children: ReactNode;
  href: string;
  className?: string;
}

const className = 'text-valencia-600 dark:text-valencia-500 underline-offset-4 hover:underline'

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
