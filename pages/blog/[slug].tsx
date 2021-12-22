import fs from 'fs'
import path from 'path'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import matter from 'gray-matter'
import PostLayout from '../../layouts/blog'

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
  const posts = fs.readdirSync(postsDir)
    .filter(p => p.endsWith('.md'))

  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.replace(/.md$/, '')
      }
    })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postPath = path.join(postsDir, `${params.slug}.md`)
  const contents = fs.readFileSync(postPath, 'utf8')
  const { data, content } = matter(contents)

  const mdxSource = await serialize(content)

  return {
    props: {
      source: mdxSource,
      frontMatter: data
    }
  }
}
