import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { MDXRemote } from 'next-mdx-remote'

import Head from '../components/head'
import Layout from '../components/layout'
import MDXComponents from '../components/mdx-components'

dayjs.extend(utc)

export default function DefaultLayout({ children, frontMatter }) {
  const { title, tags, image, description } = frontMatter

  return (
    <Layout>
      <Head
        title={title}
        description={description}
        image={image}
        tags={tags}
        isArticle
      />
      <MDXRemote
        {...children}
        components={MDXComponents}
      />
    </Layout>
  )
}
