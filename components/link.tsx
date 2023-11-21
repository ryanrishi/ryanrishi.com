import NextLink from 'next/link'
import { ReactNode } from 'react'

interface LinkProps {
  children: ReactNode;
  href: string;
  className?: string;
}

export default function Link({ href, children, ...props }: LinkProps) {
  const isInternalLink = href?.startsWith('/') || href?.startsWith('#')

  if (isInternalLink) {
    return (
      <NextLink href={href} {...props}>
        {children}
      </NextLink>
    )
  }

  return (
    <a
      href={href}
      {...props}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  )
}
