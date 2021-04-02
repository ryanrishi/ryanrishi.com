const baseClassNames = 'italic uppercase font-black mb-4 mt-8';

export function H1({ classNames, children }) {
  return <h1 className={`${baseClassNames} ${classNames ? classNames.join(' ') : ''}`.trim()}>{children}</h1>;
}

export function H2({ classNames, children }) {
  return <h2 className={`${baseClassNames} ${classNames ? classNames.join(' ') : ''}`.trim()}>{children}</h2>;
}

export function H3({ classNames, children }) {
  return <h3 className={`${baseClassNames} ${classNames ? classNames.join(' ') : ''}`.trim()}>{children}</h3>;
}

export function H4({ classNames, children }) {
  return <h4 className={`${baseClassNames} ${classNames ? classNames.join(' ') : ''}`.trim()}>{children}</h4>;
}

export function H5({ classNames, children }) {
  return <h5 className={`${baseClassNames} ${classNames ? classNames.join(' ') : ''}`.trim()}>{children}</h5>;
}

export function H6({ classNames, children }) {
  return <h6 className={`${baseClassNames} ${classNames ? classNames.join(' ') : ''}`.trim()}>{children}</h6>;
}
