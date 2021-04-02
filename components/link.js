import NextLink from 'next/link';

export default function Link({ href, children }) {
  const isInternalLink = href?.startsWith('/');

  const className = 'transition text-green-700 hover:text-green-900';

  if (isInternalLink) {
    return (
      <NextLink
        href={href}
      >
        <a className={className}>
          {children}
        </a>
      </NextLink>
    );
  }

  return (
    <a
      href={href}
      className={className}
    >
      {children}
    </a>
  );
}
