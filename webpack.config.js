const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    popup: './src/popup.js',
    contentScript: './src/contentScript.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}; 