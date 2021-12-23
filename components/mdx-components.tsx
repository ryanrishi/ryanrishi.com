import dynamic from 'next/dynamic';
import Code from './code';
import Link from './link';
import { H1, H2, H3, H4, H5, H6 } from './headings';
import Callout from './callout';
import Blockquote from './blockquote';

const MDXComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,

  a: Link,
  pre: props => <div className="overflow-x-auto" {...props} />,
  blockquote: ({ children }) => <Blockquote>{children}</Blockquote>,
  p: ({ children }) => <p className="mb-8">{children}</p>,
  ul: ({ children }) => <ul className="list-disc list-outside px-4 mb-8 -mt-6">{children}</ul>,

  code: ({ className, children }) => {
    const props = { children, language: null };
    const languageMatch = className && className.match('language-([^{]+)');
    if (languageMatch) {
      props.language = languageMatch[1];
    }

    return (
      <div>
        <Code {...props} />
      </div>
    );
  },

  inlineCode: ({ children }) => <code className="text-red-700 bg-gray-100 rounded p-1">{children}</code>,

  Blockquote,
  Callout,

  Image: dynamic(() => import('next/image')),
  LoudnessWars: dynamic(() => import('./projects/loudness-wars')),
  VideoContainer: dynamic(() => import('./video-container'))
};

export default MDXComponents
