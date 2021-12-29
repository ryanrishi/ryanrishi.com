import NextLink from 'next/link';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ReactNode } from 'react';

interface LinkProps {
  children: ReactNode;
  href: string;
  className: string;
  invert?: boolean;
}

export default function Link({ href, children, className, invert = false } : LinkProps) {
  const isInternalLink = href?.startsWith('/');

  const classes = classNames('transition', className, {
    'text-gray-800': invert,
    'hover:text-valencia-500': invert,
    'text-valencia-500': !invert,
    'hover:text-gray-800': !invert
  });

  if (isInternalLink) {
    return (
      <NextLink
        href={href}
      >
        {/* see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/402 */}
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className={classes}>
          {children}
        </a>
      </NextLink>
    );
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
  );
}

Link.propTypes = {
  className: PropTypes.string
};

Link.defaultProps = {
  className: null
};
