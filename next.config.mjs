import createMDX from '@next/mdx'

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
      'rehype-slug',
      ['rehype-autolink-headings', { properties: { class: ['anchor'] } }],
      ['rehype-pretty-code', { theme: 'material-theme' }],
    ],
    remarkPlugins: [
      'remark-gfm',
      'remark-frontmatter',
      ['remark-mdx-frontmatter', { name: 'frontmatter' }],
    ],
  },
})

export default withMdx(nextConfig)
