import Code from '../components/code';
import Link from '../components/link';
import { H1, H2, H3, H4, H5, H6 } from '../components/headings';
import Callout from '../components/callout';

/* eslint-disable react/display-name */
/* eslint-disable react/jsx-props-no-spreading */
export default {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,

  a: Link,
  pre: (props) => <div className="overflow-x-auto" {...props} />,
  blockquote: () => { throw new Error('Use the blockquote component directly'); },
  p: ({ children }) => <p className="mb-8">{children}</p>,
  ul: ({ children }) => <ul className="list-disc list-outside px-4 mb-8">{children}</ul>,

  code: ({ className, children }) => {
    const props = { children };
    const languageMatch = className && className.match('language-([^{]+)');
    if (languageMatch) {
      props.language = languageMatch[1]; // eslint-disable-line prefer-destructuring
    }

    return (
      <div>
        <Code {...props} />
      </div>
    );
  },

  Callout
};
