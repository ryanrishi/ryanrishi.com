const path = require('path');

module.exports = {
  entry: {
    'base': './webpack/base/index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  output: {
    path: path.resolve(__dirname, 'src/assets/javascript/'),
    filename: '[name].js'
  }
};
