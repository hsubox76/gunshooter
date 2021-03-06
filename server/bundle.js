var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./../webpack.config');

// var hostname = '127.0.0.1';
var hostname = 'localhost';
var port = 8080;

function bundle () {
  var bundleStart = null;
  var compiler = webpack(config);
  
  compiler.plugin('compile', function() {
    console.log('Bundling...');
    bundleStart = Date.now();
  });
  
  compiler.plugin('done', function() {
    console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
  })

  var bundler = new WebpackDevServer(compiler, {
    publicPath: config.output.publicPath,
    hot: true,
    quiet: false,
    noInfo: true,
    stats: {
      colors: true
    },
    historyApiFallback: true
  });
  
  bundler.listen(port, hostname, function (err, result) {
    if (err) {
      return console.log(err);
    }
    console.log('Bundling project, please wait');
    console.log('Webpack Dev Server listening at http://' + hostname + ':' + port + '/');
  });
}

module.exports = {
  bundle: bundle,
  hostname: hostname,
  port: port
}
