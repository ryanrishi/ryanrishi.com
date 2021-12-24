import fs from 'fs'
import path from 'path'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import matter from 'gray-matter'
import PostLayout from '../../layouts/blog'
import { getPostSlugs } from '../../lib/posts'

const postsDir = path.join(process.cwd(), 'pages', 'blog')

export default function Post({ source, frontMatter }) {
  return (
    <PostLayout
      frontMatter={frontMatter}
    >
      {source}
    </PostLayout>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  const slugs = getPostSlugs()

  return {
    paths: slugs.map((slug) => ({
      params: {
        slug: slug.replace(/\.md$/, '')
      }
    })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postPath = path.join(postsDir, `${params.slug}.md`)
  const contents = fs.readFileSync(postPath, 'utf8')
  const { data, content } = matter(contents)

  const mdxSource = await serialize(content, { scope: data })

  return {
    props: {
      source: mdxSource,
      frontMatter: data
    }
  }
}
