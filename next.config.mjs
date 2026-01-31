import createMDX from '@next/mdx'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
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
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
  },
}

const withMdx = createMDX({
  options: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { properties: { class: ['anchor'] } } ],
      [rehypePrettyCode, { theme: 'material-theme' }],
    ],
    remarkPlugins: [
      remarkGfm,
      remarkFrontmatter,
      [mdxFrontmatter, { name: 'frontmatter' }],
    ],
  },
})

export default withMdx(nextConfig)
