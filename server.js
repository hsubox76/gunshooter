var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

// var hostname = '127.0.0.1';
var hostname = '192.168.20.47';
var port = 3000;

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  contentBase: "./src/client",
  hot: true,
  historyApiFallback: true
}).listen(port, hostname, function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://' + hostname + ':' + port + '/');
});
