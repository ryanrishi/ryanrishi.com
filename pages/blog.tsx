import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { GetStaticProps } from 'next'
import React from 'react'

import Head from '../components/head'
import { H2 } from '../components/headings'
import Layout from '../components/layout'
import Link from '../components/link'
import { getAllPosts, Post } from '../lib/posts'

interface BlogProps {
  posts: Post[];
}

dayjs.extend(utc)

export default function BlogIndex({ posts }: BlogProps) {
  return (
    <Layout>
      <Head
        title="Blog"
      />
      {posts.map(post => (
        <div
          className="mb-8 lg:mb-16 xl:mb-32"
          data-test-blog-post
          key={post.slug}
        >
          <H2 className="post-title">
            <Link
              href={`/blog/${post.slug}`}
              invert
            >
              {post.title}
            </Link>
          </H2>
          <p className="py-4 text-gray-700" data-test-blog-post-date>{dayjs.utc(post.date).format('MMMM D, YYYY')}</p>

          <div className="flex flex-col">
            <p>{post.description}</p>
            <Link className="flex justify-end italic uppercase font-bold" href={`/blog/${post.slug}`} invert>Read more &raquo;</Link>
          </div>
        </div>
      ))}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const posts = getAllPosts()

  return {
    props: { posts },
  }
}
