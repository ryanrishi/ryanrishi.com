import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { Metadata } from 'next'
import Link from 'next/link'

import { H1 } from '@/components/headings'
import Layout from '@/components/layout'

dayjs.extend(utc)

export const metadata: Metadata = {
  title: 'Blog | Ryan Rishi',
}

export default function BlogIndex() {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  // const trail = useTrail(posts.length, {
  //   opacity: 1,
  //   y: 0,
  //   from: {
  //     opacity: 0,
  //     y: -50,
  //   },
  // })

  return (
    <Layout>
      {posts.map((post, i) => (
        <div
          className="mb-16 lg:mb-16 xl:mb-32"
          data-test-blog-post
          // style={style}
          key={i}
        >
          <H1 className="hover:text-slate-900 dark:hover:text-slate-300">
            <Link href={posts[i].url} legacyBehavior>
              {posts[i].title}
            </Link>
          </H1>
          <p className="pb-4 text-slate-700 dark:text-slate-400 transition" data-test-blog-post-date>{dayjs.utc(posts[i].date).format('MMMM D, YYYY')}</p>

          <div className="flex flex-col">
            <p className="transition">{posts[i].description}</p>
            <Link className="flex justify-end pt-4 italic uppercase font-bold dark:text-slate-100 transition" href={posts[i].url}>
              Read more &raquo;
            </Link>
          </div>
        </div>
      ))}
    </Layout>
  );
}
