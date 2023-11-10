import { GetStaticPaths, GetStaticProps } from 'next'

import PostLayout from '../../layouts/blog'
import { getPostBySlug, getPostSlugs } from '../../lib/posts'

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
        slug: slug.replace(/\.md$/, ''),
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = getPostBySlug(params.slug as string)

  const mdxSource = await serialize(post.content, { scope: { ...post } })

  return {
    props: {
      source: mdxSource,
      frontMatter: post,
    },
  }
}
