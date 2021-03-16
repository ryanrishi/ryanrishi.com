import Link from 'next/link';
import { MDXProvider } from '@mdx-js/react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Layout from '../components/layout';
import Code from '../components/code';
import Head from '../components/head';

dayjs.extend(utc);

/* eslint-disable react/display-name */
/* eslint-disable react/jsx-props-no-spreading */
const components = {
  pre: (props) => <div {...props} />,

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
  }
};
/* eslint-enable react/display-name */
/* eslint-enable react/jsx-props-no-spreading */

export default function Index({ children, frontMatter }) {
  const { title, date, tags, image, description } = frontMatter;

  return (
    <Layout>
      <Head
        title={title}
        date={date}
        description={description}
        image={image}
        tags={tags}
        isArticle
      />
      <div>
        <h1>{title}</h1>
        <p>{dayjs.utc(date).format('MMMM D, YYYY')}</p>
        <hr />
        <MDXProvider components={components}>{children}</MDXProvider>
        <div className="back-to-blog">
          <Link href="/blog">
            &larr; Back to Blog
          </Link>
        </div>
      </div>
    </Layout>
  );
}
