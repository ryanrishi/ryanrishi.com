import mdxComponents from 'components/mdx-components'
import { allPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { useMDXComponent } from  'next-contentlayer/hooks'

export const generateStaticParams = async () => allPosts.map((post) => ({ slug: post._raw.flattenedPath }))

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === `blog/${params.slug}`)
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`)
  return { title: post.title }
}

export default function Post({ params }: { params: { slug: string } }) {
  const post = allPosts.find((post) => post._raw.flattenedPath === `blog/${params.slug}`)
  if (!post) notFound()

  const MDXContent = useMDXComponent(post.body.code)

  return (
    <>
      <h1>
        {post.title}
      </h1>
      <MDXContent components={mdxComponents} />
    </>
  )
}

// export const getStaticPaths: GetStaticPaths = () => {
//   const slugs = getPostSlugs()

//   return {
//     paths: slugs.map((slug) => ({
//       params: {
//         slug: slug.replace(/\.md$/, ''),
//       },
//     })),
//     fallback: false,
//   }
// }

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const post = getPostBySlug(params.slug as string)

//   const mdxSource = await serialize(post.content, { scope: { ...post } })

//   return {
//     props: {
//       source: mdxSource,
//       frontMatter: post,
//     },
//   }
// }
