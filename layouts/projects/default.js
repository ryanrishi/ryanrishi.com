import Head from 'next/Head';
import Layout from '../../components/layout';

export default function Index({ children, frontMatter }) {
  const { name } = frontMatter;

  return (
    <Layout>
      <Head>
      <title key="title">{(name ? `${name} | ` : '') + 'Ryan Rishi'}</title>
      </Head>
      <div>
        <h1>{name}</h1>
        <div>
          {children}
        </div>
      </div>
    </Layout>
  );
}
