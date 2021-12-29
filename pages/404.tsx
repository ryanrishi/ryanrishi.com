import matter from 'gray-matter'
import { GetStaticProps } from 'next'
import { serialize } from 'next-mdx-remote/serialize'

import Layout from '../layouts'

export default function Error404({ content, frontMatter }) {
  return (
    <Layout
      frontMatter={frontMatter}
    >
      {content}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const source = `\
---
title: '404'
---

# 404
The page you are looking for does not exist. [Return home](/)?
`

  const { data, content } = matter(source)
  const mdxSource = await serialize(content, { scope: data })

  return {
    props: {
      content: mdxSource,
      frontMatter: data,
    },
  }
}
