/* eslint-env node */

const withTM = require('next-transpile-modules')([
  'd3',

  // transitive dependencies of d3
  'delaunator',
  'internmap',
  'robust-predicates',
])

module.exports = withTM({
  eslint: {
    dirs: [
      'components',
      'layouts',
      'lib',
      'pages',
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
})
