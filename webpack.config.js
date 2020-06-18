const path = require('path');

module.exports = {
  watch: true,
  mode: process.env.NODE_ENV,
  entry: {
    'loudness-wars': './webpack/loudness-wars.js',
    'covid-19': './webpack/covid-19.js',
    'base': './webpack/base/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'src/assets/javascript/'),
    filename: '[name].js'
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
  }
};
