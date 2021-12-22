import { MDXRemote } from 'next-mdx-remote';
import Head from '../../components/head';
import Layout from '../../components/layout';
import { H1 } from '../../components/headings';
import MDXComponents from '../../components/mdx-components';

export default function Index({ children, frontMatter }) {
  const { name, description, image, date } = frontMatter;

  return (
    <Layout>
      <Head
        title={name}
        description={description}
        image={image.src}
        date={date}
        isArticle
      />
      <div>
        <H1>{name}</H1>
        <MDXRemote
          {...children}
          components={MDXComponents}
        />
      </div>
    </Layout>
  );
}
