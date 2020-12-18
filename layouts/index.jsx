import Layout from '../components/layout';
import { H1, H3 } from '../components/headings';
import Code from '../components/code';
import Link from 'next/Link';
import { MDXProvider } from "@mdx-js/react";

export default function Index({ children, frontMatter }) {
  const { title, snippet } = frontMatter;

  return (
    <Layout>
      <div>
        <H1>{title}</H1>
        <p>{snippet}</p>
        <MDXProvider components={components}>{children}</MDXProvider>
        <div className="flex justify-center">
          <Link href="/blog">
            <a>
              Back to Blog
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

const components = {
  h1: H1,
  h3: H3,
  // h2: ({ children, ...rest }) => (
  //   <h2
  //     className="mt-12 text-lg font-semibold leading-tight text-gray-900 md:text-2xl"
  //     {...rest}
  //   >
  //     {children}
  //   </h2>
  // ),
  // h3: () => {
  //   throw new Error("Selikoff: Don't use an h3 in your blog posts, dude");
  // },
  // p: ({ children }) => <p className="mt-4 lg:mt-6">{children}</p>,
  // img: (props) => <img className="mt-4 lg:mt-6" {...props} />,
  // a: ({ children, ...rest }) => (
  //   <a className="text-blue-500 underline" {...rest}>
  //     {children}
  //   </a>
  // ),
  // hr: () => <hr className="mt-4 lg:mt-6" />,
  // ol: (props) => <ol className="pl-6 mt-4 list-decimal lg:mt-6" {...props} />,
  // ul: (props) => <ul className="pl-6 mt-4 list-disc lg:mt-6" {...props} />,
  // li: (props) => <li className="mt-2" {...props} />,

  // blockquote: ({ children }) => (
  //   <blockquote className="pl-4 italic border-l-4">{children}</blockquote>
  // ),
  // inlineCode: ({ children }) => (
  //   <code className="px-1 py-px text-sm bg-gray-100">{children}</code>
  // ),
  // pre: (props) => <div {...props} />,

  // MDX assigns a className of something like `language-jsx{1,5-10}`
  code: ({ className, children }) => {
    let props = { children };
    let languageMatch = className && className.match("language-([^{]+)");
    if (languageMatch) {
      props.language = languageMatch[1];
    }
    let highlightedLinesMatch = className && className.match("{(.+)}");
    if (highlightedLinesMatch) {
      props.highlightedLines = highlightedLinesMatch[1];
    }
    debugger

    return (
      <div className="my-8 -mx-6 overflow-hidden sm:rounded-lg md:mx-auto">
        <Code {...props} />
      </div>
    );
  }
}
