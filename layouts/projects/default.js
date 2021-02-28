import Head from '../../components/head';
import Layout from '../../components/layout';

export default function Index({ children, frontMatter }) {
  const { name, blurb, image } = frontMatter;

  return (
    <Layout>
      <Head
        title={name}
        description={blurb}
        image={image}
      />
      <div>
        <h1>{name}</h1>
        <div>
          {children}
        </div>
      </div>
    </Layout>
  );
}
