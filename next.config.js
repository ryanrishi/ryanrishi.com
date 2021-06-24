/* eslint-env node */

// const withTM = require('next-transpile-modules')(['d3']);
const withMdxEnhanced = require('next-mdx-enhanced');

module.exports = withMdxEnhanced({
  defaultLayout: true,
  fileExtensions: ['md', 'mdx']
})({
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
