import fs from 'fs'
import matter from 'gray-matter'
import { GetStaticPaths, GetStaticProps } from 'next'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path'

import Layout from '../layouts'

const pagesDir = path.join(process.cwd(), 'pages')

interface PageProps {
  source: MDXRemoteSerializeResult;
  frontMatter: {
    title: string;
    tags?: string[]
    image?: string;
    description?: string;
  }
}

export default function Page({ source, frontMatter }: PageProps) {
  return (
    <Layout
      mdxRemoteSerializedResult={source}
      frontMatter={frontMatter}
    />
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  const pages = fs.readdirSync(pagesDir)
    .filter(page => page.endsWith('.md'))
    .map(page => page.replace(/.md$/, ''))


  return {
    paths: pages.map(page => ({
      params: {
        slug: page,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pagePath = path.join(pagesDir, `${params.slug}.md`)
  const contents = fs.readFileSync(pagePath, 'utf8')
  const { data, content } = matter(contents)

  const mdxSource = await serialize(content, { scope: data })

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  }
}