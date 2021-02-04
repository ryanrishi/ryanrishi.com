import Layout from '../components/layout';
import Code from '../components/code';
import Link from 'next/Link';
import { MDXProvider } from "@mdx-js/react";

export default function Index({ children, frontMatter }) {
  const { title, snippet } = frontMatter;

  return (
    <Layout>
      <div>
        <h1>{title}</h1>
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
  pre: (props) => <div {...props} />,

  code: ({ className, children }) => {
    let props = { children };
    let languageMatch = className && className.match("language-([^{]+)");
    if (languageMatch) {
      props.language = languageMatch[1];
    }

    return (
      <div>
        <Code {...props} />
      </div>
    );
  }
}
