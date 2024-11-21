const webpack = require('webpack');
const config = require('../webpack.config');

delete config.chromeExtensionBoilerplate;

webpack(config, function (err, stats) {
  if (err) throw err;
  if (stats.hasErrors()) {
    console.error(stats.toString({
      colors: true
    }));
  } else {
    console.log(stats.toString({
      colors: true
    }));
  }
});
