import { MDXProvider } from '@mdx-js/react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import MDXComponents from '../components/mdx-components';
import Layout from '../components/layout';
import Head from '../components/head';

dayjs.extend(utc);

export default function Index({ children, frontMatter }) {
  const { title, tags, image, description } = frontMatter;

  return (
    <Layout>
      <Head
        title={title}
        description={description}
        image={image}
        tags={tags}
        isArticle
      />
      <MDXProvider components={MDXComponents}>{children}</MDXProvider>
    </Layout>
  );
}
