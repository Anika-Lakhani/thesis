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
      },
      {
        test: /\.(woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        exclude: /assets[\\/]icons/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]'
        }
      },
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
        { 
          from: 'src/assets/icons',
          to: 'assets/icons'
        },
        { 
          from: 'src/assets/images/owl_popup.png',
          to: 'assets/images/owl_popup.png'
        },
        { 
          from: 'public/fonts/OpenDyslexic-Regular.woff2',
          to: 'fonts/OpenDyslexic-Regular.woff2'
        },
        { 
          from: 'public/fonts/OpenDyslexic-Regular.woff',
          to: 'fonts/OpenDyslexic-Regular.woff'
        }
      ]
    })
  ],
  devtool: 'cheap-module-source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
