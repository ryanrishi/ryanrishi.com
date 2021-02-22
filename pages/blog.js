import React from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';
import Layout from '../components/layout';
import Head from '../components/head';
import { getAllPosts } from '../lib/posts';

export default function BlogIndex({ allPosts }) {
  return (
    <Layout>
      <Head
        title="Blog"
      />
      {allPosts.map((post) => (
        <div className="post" key={post.slug}>
          <h2 className="post-title">
            <Link href={`/blog/${post.slug}`}>
              <a className="post-link" href={`/blog/${post.slug}`}>{post.title}</a>
            </Link>
          </h2>
          <p className="post-meta">{dayjs(post.date).format('MMMM D, YYYY')}</p>

          <div className="post-preview">
            <p>{post.blurb}</p>
            <a className="post-read-more" href={`/blog/${post.slug}`}>Read more &raquo;</a>
          </div>
        </div>
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts(['title', 'date', 'slug', 'blurb', 'image', 'tags']);

  return {
    props: { allPosts }
  };
}
