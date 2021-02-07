import Layout from '../components/layout';
import Code from '../components/code';
import Link from 'next/Link';
import Head from 'next/Head';
import { MDXProvider } from "@mdx-js/react";
import dayjs from 'dayjs'

export default function Index({ children, frontMatter }) {
  const { title, date, tags, image, blurb } = frontMatter;

  return (
    <Layout>
      <Head>
        <title key="title">{(title ? `${title} | ` : '') + 'Ryan Rishi'}</title>

        <meta property="article:published_time" content={dayjs(date).toISOString()} />
        <meta property="article:author" content="Ryan Rishi" />
        <meta property="og:type" key="og:type" content="article" />

        {title && (
          <meta property="og:title" key="og:title" content={title} />
        )}

        {blurb && (
          <meta property="og:description" key="og:description" content={blurb} />
        )}

        {image && (
          <meta property="og:image" key="og:image" content={image} />
        )}
        {tags.map((tag) => (
          <meta property="article:tag" key={tag} content={tag} />
        ))}
      </Head>
      <div>
        <h1>{title}</h1>
        <p>{dayjs(date).format('MMMM D, YYYY')}</p>
        <hr />
        <MDXProvider components={components}>{children}</MDXProvider>
        <div className="back-to-blog">
          <Link href="/blog">
            <a>
              &larr; Back to Blog
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
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
