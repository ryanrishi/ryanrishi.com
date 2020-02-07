const path = require('path');

module.exports = {
  entry: './webpack/index.js',
  output: {
    path: path.resolve(__dirname, 'src/assets/javascript/'),
    filename: 'main.js'
  }
};
