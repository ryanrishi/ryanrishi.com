import NextLink from 'next/link';

export default function Link({ href, children, classNames, invert = false }) {
  const isInternalLink = href?.startsWith('/');

  let className = 'transition';
  if (invert) {
    className += ' text-gray-800 hover:text-green-700';
  } else {
    className += ' text-green-700 hover:text-gray-800';
  }

  if (Array.isArray(classNames)) {
    className = className.split(' ').concat(...classNames).join(' ');
  } else if (typeof classNames === 'string') {
    className += ` ${classNames}`;
  }

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
