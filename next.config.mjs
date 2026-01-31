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
    // NOTE: Turbopack currently requires MDX loader options to be serializable.
    // Passing plugin functions here breaks `next build`/`next dev` under Turbopack.
    // To keep this branch focused on enabling Turbopack, we temporarily omit plugins.
  },
})

export default withMdx(nextConfig)
