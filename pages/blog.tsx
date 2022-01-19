import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import React from 'react'
import { a, useTrail } from 'react-spring'

import Head from '../components/head'
import { H1 } from '../components/headings'
import Layout from '../components/layout'
import { getAllPosts, Post } from '../lib/posts'

interface BlogProps {
  posts: Post[];
}

dayjs.extend(utc)

export default function BlogIndex({ posts }: BlogProps) {
  const trail = useTrail(posts.length, {
    opacity: 1,
    y: 0,
    from: {
      opacity: 0,
      y: -50,
    },
  })

  return (
    <Layout>
      <Head
        title="Blog"
      />
      {trail.map((style, i) => (
        <a.div
          className="mb-16 lg:mb-16 xl:mb-32"
          data-test-blog-post
          style={style}
          key={i}
        >
          <H1 className="hover:text-gray-900 dark:hover:text-gray-300">
            <Link
              href={`/blog/${posts[i].slug}`}
            >
              {posts[i].title}
            </Link>
          </H1>
          <p className="pb-4 text-gray-700 dark:text-gray-400 transition" data-test-blog-post-date>{dayjs.utc(posts[i].date).format('MMMM D, YYYY')}</p>

          <div className="flex flex-col">
            <p className="transition">{posts[i].description}</p>
            <Link href={`/blog/${posts[i].slug}`}>
              <a className="flex justify-end pt-4 italic uppercase font-bold dark:text-gray-100 transition">
                Read more &raquo;
              </a>
            </Link>
          </div>
        </a.div>
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
