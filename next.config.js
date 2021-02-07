const withMdxEnhanced = require('next-mdx-enhanced');

module.exports = withMdxEnhanced({
  defaultLayout: true,
  fileExtensions: ['md', 'mdx']
})({
  async redirects() {
    return [
      {
        // TODO redirect Jekyll to Next
        // /2020/01/17/tufte.html → /blog/2020-01-17-tufte
        // https://github.com/vercel/next.js/issues/15712
        source: '/:year((?!_next).*)/:month/:day/:post.html',
        destination: '/blog/:year-:month-:day-:post',
        permanent: false
      }
    ]
  }
});
