const withMdxEnhanced = require('next-mdx-enhanced');

module.exports = withMdxEnhanced({
  defaultLayout: true,
  fileExtensions: ['md', 'mdx']
})();
