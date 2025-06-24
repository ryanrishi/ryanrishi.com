import createMDX from '@next/mdx'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import mdxFrontmatter from 'remark-mdx-frontmatter'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['md', 'mdx', 'ts', 'tsx'],
  async redirects() {
    return [
      {
        source: '/:year((?!_next).*)/:month/:day/:post.html',
        destination: '/blog/:year-:month-:day-:post',
        permanent: false,
      },
    ]
  },
  transpilePackages: [
    'd3',

    // transitive dependencies of d3
    'delaunator',
    'internmap',
    'robust-predicates',
  ],
}

const withMdx = createMDX({
  options: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { properties: { class: ['anchor'] } } ],
      [rehypePrettyCode, { theme: 'material-theme' }]
    ],
    remarkPlugins: [
      remarkFrontmatter,
      [mdxFrontmatter, { name: 'frontmatter' }]
    ],
  },
})

export default withMdx(nextConfig)
