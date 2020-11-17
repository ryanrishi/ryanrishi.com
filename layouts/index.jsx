import Layout from '../components/layout';
import { H1 } from '../components/headings';
import Link from 'next/Link';

const Index = ({ children, frontMatter }) => {
  const { title, snippet } = frontMatter;

  return (
    <Layout>
      <div>
        <H1>{title}</H1>
        <p>{snippet}</p>
        <section>{children}</section>
        <div className="flex justify-center">
          <Link href="/blog">
            <a>
              Back to Blog
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  )
};

export default Index;
