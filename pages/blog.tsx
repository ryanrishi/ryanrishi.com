import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import React from 'react'

import Head from '../components/head'
import { H2 } from '../components/headings'
import Layout from '../components/layout'
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
          className="mb-16 lg:mb-16 xl:mb-32"
          data-test-blog-post
          key={post.slug}
        >
          <H2 className="hover:text-gray-900 dark:hover:text-gray-300">
            <Link
              href={`/blog/${post.slug}`}
            >
              {post.title}
            </Link>
          </H2>
          <p className="pb-4 text-gray-700 dark:text-gray-400 transition" data-test-blog-post-date>{dayjs.utc(posts[i].date).format('MMMM D, YYYY')}</p>

          <div className="flex flex-col">
            <p className="transition transition-color">{posts[i].description}</p>
            <Link href={`/blog/${posts[i].slug}`}>
              <a className="flex justify-end pt-4 italic uppercase font-bold dark:text-gray-100 transition transition-color">
                Read more &raquo;
              </a>
            </Link>
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
