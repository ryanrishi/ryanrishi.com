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
        <div className="leading-tight">
          <H1>{title}</H1>
          <p className="mb-8 text-slate-500 dark:text-slate-400 transition">{dayjs.utc(date).format('MMMM D, YYYY')}</p>
        </div>

        <div className="leading-8">
          <MDXRemote
            {...children}
            components={MDXComponents}
          />
        </div>
        <div className="flex items-center justify-center my-8">
          <Link href="/blog">
            <a className="text-slate-500 hover:text-slate-600 transition">
              &larr; Back to Blog
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  )
}
