import React from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Link from '../components/link';
import Layout from '../components/layout';
import Head from '../components/head';
import { getAllPosts } from '../lib/posts';
import { H2 } from '../components/headings';

dayjs.extend(utc);

export default function BlogIndex({ allPosts }) {
  return (
    <Layout>
      <Head
        title="Blog"
      />
      {allPosts.map((post) => (
        <div className="mb-16" key={post.slug}>
          <H2 className="post-title">
            <Link href={`/blog/${post.slug}`}>
              <a className="post-link" href={`/blog/${post.slug}`}>{post.title}</a>
            </Link>
          </H2>
          <p className="py-4 text-gray-700">{dayjs.utc(post.date).format('MMMM D, YYYY')}</p>

          <div className="flex flex-col">
            <p>{post.description}</p>
            <a className="flex justify-end italic uppercase font-bold" href={`/blog/${post.slug}`}>Read more &raquo;</a>
          </div>
        </div>
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts(['title', 'date', 'slug', 'description', 'image', 'tags']);

  return {
    props: { allPosts }
  };
}
