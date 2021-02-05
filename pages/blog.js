import React from 'react';
import Layout from '../components/layout';
import Link from 'next/Link'
import { getAllPosts } from '../lib/posts';

export default function BlogIndex({ allPosts }) {
  return (
    <Layout>
      <ul>
        {allPosts.map((post, index) => (
          <div className="post" key={post.slug}>
            <h2 className="post-title">
              <a className="post-link" href={`/blog/${post.slug}`}>{post.title}</a>
            </h2>
            <p className="post-meta">{new Date(post.date).toLocaleDateString()}</p>

            <div className="post-preview">
              <p>{post.blurb}</p>
              <a className="post-read-more" href={`/blog/${post.slug}`}>Read more &raquo;</a>
            </div>
          </div>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts(["title", "date", "slug", "blurb", "tags"]);

  return {
    props: { allPosts },
  };
}
