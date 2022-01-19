import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { ReactNode } from 'react'

import Head from '../components/head'
import { FancyH1 } from '../components/headings'
import Layout from '../components/layout'
import MDXComponents from '../components/mdx-components'

dayjs.extend(utc)

interface FrontMatter {
  title?: string
  description?: string
  image?: string
  tags?: string[]
  isArticle?: boolean
}

interface LayoutProps {
  mdxRemoteSerializedResult?: MDXRemoteSerializeResult
  children?: ReactNode
  frontMatter?: FrontMatter
}

export default function DefaultLayout({ children, mdxRemoteSerializedResult, frontMatter = {} }: LayoutProps) {
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
      {title && <FancyH1>{title}</FancyH1>}
      {mdxRemoteSerializedResult && (
        <MDXRemote
          {...mdxRemoteSerializedResult}
          components={MDXComponents}
        />
      )}
      {children}
    </Layout>
  )
}
