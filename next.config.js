/* eslint-env node */
const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: [
      'components',
      'layouts',
      'lib',
      'pages',
      'app',
    ],
  },

  async redirects() {
    return [
      {
        source: '/:year((?!_next).*)/:month/:day/:post.html',
        destination: '/blog/:year-:month-:day-:post',
        permanent: false,
      },
    ]
  },
}

const withTM = require('next-transpile-modules')([
  'd3',

  // transitive dependencies of d3
  'delaunator',
  'internmap',
  'robust-predicates',
])

module.exports = withContentlayer(withTM(nextConfig))
