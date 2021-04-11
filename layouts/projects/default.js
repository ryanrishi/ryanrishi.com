import { MDXProvider } from '@mdx-js/react';
import Head from '../../components/head';
import Layout from '../../components/layout';
import { H1 } from '../../components/headings';
import MDXComponents from '../../lib/mdx-components';

export default function Index({ children, frontMatter }) {
  const { name, description, image, date } = frontMatter;

  return (
    <Layout>
      <Head
        title={name}
        description={description}
        image={image}
        date={date}
        isArticle
      />
      <div>
        <H1>{name}</H1>
        <MDXProvider components={MDXComponents}>{children}</MDXProvider>
      </div>
    </Layout>
  );
}
