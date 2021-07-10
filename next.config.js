/* eslint-env node */

const withPlugins = require('next-compose-plugins');
const withMdxEnhanced = require('next-mdx-enhanced');
const withTM = require('next-transpile-modules')([
  'd3',

  // transitive dependencies of d3
  'delaunator',
  'internmap',
  'robust-predicates'
]);

module.exports = withPlugins([
  withTM,
  withMdxEnhanced({
    defaultLayout: true,
    fileExtensions: ['md', 'mdx']
  })
], {
  async redirects() {
    return [
      {
        source: '/:year((?!_next).*)/:month/:day/:post.html',
        destination: '/blog/:year-:month-:day-:post',
        permanent: false
      }
    ];
  }
});
