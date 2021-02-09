import Layout from '../components/layout';
import Code from '../components/code';
import Link from 'next/Link';
import Head from '../components/head';
import { MDXProvider } from "@mdx-js/react";
import dayjs from 'dayjs'

export default function Index({ children, frontMatter }) {
  const { title, date, tags, image, blurb } = frontMatter;

  return (
    <Layout>
      <Head
        title={title}
        date={date}
        blurb={blurb}
        image={image}
        tags={tags}
        isArticle={true} />
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
