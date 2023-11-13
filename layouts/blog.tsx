import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import Link from 'next/link'

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
        tags={tags}
        isArticle
      />
      <div>
        <div className="leading-tight">
          <H1>{title}</H1>
          <p className="mb-8 text-slate-500 dark:text-slate-400 transition">{dayjs.utc(date).format('MMMM D, YYYY')}</p>
        </div>

      </div>
    </Layout>
  )
}
