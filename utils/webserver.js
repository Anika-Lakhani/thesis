const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('../webpack.config');
const path = require('path');

const compiler = webpack(config);
const server = new WebpackDevServer({
  https: false,
  hot: true,
  liveReload: true,
  static: {
    directory: path.join(__dirname, '../build'),
  },
  devMiddleware: {
    publicPath: `http://localhost:${port}/`,
    writeToDisk: true,
  },
  port,
}, compiler);

(async () => {
  await server.start();
})();
