import Head from '../../components/head';
import Layout from '../../components/layout';

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
        <h1>{name}</h1>
        <div>
          {children}
        </div>
      </div>
    </Layout>
  );
}
