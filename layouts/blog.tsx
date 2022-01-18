import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote'

import Head from '../components/head'
import { H1 } from '../components/headings'
import Layout from '../components/layout'
import MDXComponents from '../components/mdx-components'

dayjs.extend(utc)

export default function Index({ children, frontMatter }) {
  const { title, date, tags, image, description } = frontMatter

  return (
    <Layout>
      <Head
        title={title}
        date={date}
        description={description}
        image={image}
        tags={tags}
        isArticle
      />
      <div>
        <H1>{title}</H1>
        <p className="-mt-4 mb-4 text-gray-600 dark:text-gray-300 transition">{dayjs.utc(date).format('MMMM D, YYYY')}</p>
        <hr className="my-4" />
        <div className="leading-8">
          <MDXRemote
            {...children}
            components={MDXComponents}
          />
        </div>
        <div className="flex items-center justify-center my-8">
          <Link href="/blog">
            <a className="text-gray-500 hover:text-gray-600 transition">
              &larr; Back to Blog
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  )
}
