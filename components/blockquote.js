import React from 'react';
import PropTypes from 'prop-types';
import Link from './link';

export default function Quote({ children, name, citationLink }) {
  return (
    <blockquote className="relative p-4 text-xl text-gray-600 quote italic mb-4 border-l-4 sm:border-l-0">
      <div
        className="text-gray-300 text-8xl italic right-full absolute top-0 leading-none hidden sm:block font-serif"
        aria-hidden="true"
      >
        &ldquo;
      </div>
      <div className="mb-4">{children}</div>
      {name && (
        <cite className="flex items-center">
          <div className="flex flex-col items-start">
            <span className="mb-1 text-sm font-semibold text-gray-800">
              {citationLink ? <Link href={citationLink}>{name}</Link> : name}
            </span>
          </div>
        </cite>
      )}
    </blockquote>
  );
}

Quote.propTypes = {
  citationLink: PropTypes.string,
  name: PropTypes.string
};

Quote.defaultProps = {
  citationLink: '',
  name: ''
};
