import React from 'react';
import PropTypes from 'prop-types';

export default function Quote({ quote, name, citationLink }) {
  return (
    <blockquote className="relative p-4 text-xl italic border-l-4 bg-neutral-100 text-neutral-600 border-neutral-500 quote mb-4">
      <div className="stylistic-quote-mark" aria-hidden="true">
        &ldquo;
      </div>
      <p className="mb-4">{quote}</p>
      <cite className="flex items-center">
        <div className="flex flex-col items-start">
          <span className="mb-1 text-sm italic font-bold">
            {citationLink ? <a href={citationLink}>{name}</a> : name}
          </span>
        </div>
      </cite>
    </blockquote>
  );
}

Quote.propTypes = {
  citationLink: PropTypes.string,
  name: PropTypes.string.isRequired,
  quote: PropTypes.string.isRequired
};

Quote.defaultProps = {
  citationLink: ''
};
