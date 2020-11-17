import Layout from '../components/layout';
import { H1, H3 } from '../components/headings';
import Link from 'next/Link'
import { getAllPosts } from '../lib/posts';

export default function BlogIndex({ allPosts }) {
  return (
    <Layout>
      <H1>Blog</H1>
      <ul>
        {allPosts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <a>
                <H3>{post.title}</H3>
                <p>{post.blurb}</p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts(["title", "date", "slug", "blurb"]);

  return {
    props: { allPosts },
  };
}
