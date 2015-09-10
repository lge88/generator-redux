const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const host = 'localhost';
const port = <%= port %>;

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
}).listen(port, host, function handle(err) {
  if (err) {
    console.log(err);
  }
  console.log('http://' + host + ':' + port + '/');
});
