import dynamic from 'next/dynamic'

import Blockquote from './blockquote'
import Callout from './callout'
import Code from './code'
import { H1, H2, H3, H4, H5, H6 } from './headings'
import Link from './link'

/**
 * @see https://tomekdev.com/posts/anchors-for-headings-in-mdx
 * @param text
 * @returns dasherized, lowercased, sanitized anchor link
 * @example getAnchor('I'm a teap0t') → 'im-a-teap0t'
 */
function getAnchor(text: string | string[]) {
  return (text instanceof Array ? text.join(' ') : text)  // titles with elements like `&mdash;` split the string
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')  // remove all non-alphanumeric/non-space characters
    .replace(/[ ]/g, '-')        // replace spaces with dashes
}

// TODO lol this is why I love React, but I should probz find a less hacky way to do this
function AnchorWrappedInHeadingTag({ originalProps, Tag }: { originalProps: any, Tag: typeof H1 | typeof H2 | typeof H3 | typeof H4 | typeof H5 | typeof H6 }) {
  const anchor = getAnchor(originalProps.children)

  return (
    <Tag id={anchor} className="hover:underline">
      <a className="hover:before:content-['#'] before:absolute before:-ml-[0.75em] before:text-gray-300 dark:before:text-gray-600" href={`#${anchor}`}>{originalProps.children}</a>
    </Tag>
  )
}

const MDXComponents = {
  h1: props => <AnchorWrappedInHeadingTag Tag={H1} originalProps={props} />,
  h2: props => <AnchorWrappedInHeadingTag Tag={H2} originalProps={props} />,
  h3: props => <AnchorWrappedInHeadingTag Tag={H3} originalProps={props} />,
  h4: props => <AnchorWrappedInHeadingTag Tag={H4} originalProps={props} />,
  h5: props => <AnchorWrappedInHeadingTag Tag={H5} originalProps={props} />,
  h6: props => <AnchorWrappedInHeadingTag Tag={H6} originalProps={props} />,

  a: Link,
  pre: props => <div className="overflow-x-auto" {...props} />,
  blockquote: ({ children }) => <Blockquote>{children}</Blockquote>,
  p: ({ children }) => <p className="leading-loose mb-4 transition">{children}</p>,
  ul: ({ children }) => <ul className="list-disc list-outside px-4 mb-8 transition">{children}</ul>,
  img: props => <img className="mx-auto" {...props} />,
  table: props => <table className="w-full" {...props}></table>,

  code: ({ className, children }) => {
    const props = { children, language: null }
    const languageMatch = className && className.match('language-([^{]+)')
    if (languageMatch) {
      props.language = languageMatch[1]
    }

    return (
      <Code {...props} />
    )
  },

  inlineCode: ({ children }) => <code className="font-bold p-1">{`\`${children}\``}</code>,

  Blockquote,
  Callout,

  Image: dynamic(() => import('next/image')),
  LoudnessWars: dynamic(() => import('./projects/loudness-wars')),
  VideoContainer: dynamic(() => import('./video-container')),
}

export default MDXComponents
