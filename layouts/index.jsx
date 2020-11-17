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
  code: ({ className, children }) => {
    return (
      <div className="my-8 -mx-6 overflow-hidden sm:rounded-lg md:mx-auto">
        <Code {...props} />
      </div>
    );
  }
}
