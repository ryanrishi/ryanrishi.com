import Layout from '../../components/layout';

export default function Index({ children, frontMatter }) {
  const { name } = frontMatter;

  return (
    <Layout>
      <div>
        <h1>{name}</h1>
        <div>
          {children}
        </div>
      </div>
    </Layout>
  )
}
