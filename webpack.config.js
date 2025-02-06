const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    popup: './src/pages/Popup/index.jsx',
    contentScript: './src/pages/Content/index.js',
    background: './src/pages/Background/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/pages/Popup/index.html',
      filename: 'popup.html',
      chunks: ['popup']
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/manifest.json' },
        { from: 'src/assets/icon-16.png', to: 'icon-16.png' },
        { from: 'src/assets/icon-48.png', to: 'icon-48.png' },
        { from: 'src/assets/icon-128.png', to: 'icon-128.png' },
        { from: 'src/assets/icon-34.png', to: 'icon-34.png' }
      ]
    })
  ],
  devtool: 'cheap-module-source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
