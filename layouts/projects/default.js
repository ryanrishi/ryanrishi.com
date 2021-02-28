import Head from '../../components/head';
import Layout from '../../components/layout';

export default function Index({ children, frontMatter }) {
  const { name, blurb, image, date } = frontMatter;

  return (
    <Layout>
      <Head
        title={name}
        description={blurb}
        image={image}
        date={date}
        isArticle
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
