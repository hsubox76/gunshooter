
const path = require('path');
const express = require('express');
const roomsById = require('./server/data/rooms.js');
const itemsById = require('./server/data/items.js');
const _ = require('lodash');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

if (isDeveloping) {
    const config = require('./webpack.config.js');
    const webpack = require('webpack');
    const webpackMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const compiler = webpack(config);
    const middleware = webpackMiddleware(compiler, {
        publicPath: config.output.publicPath,
        hot: true,
        historyApiFallback: true,
        contentBase: 'public/',
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        }
    });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use(express.static(__dirname + '/public'));
}

var contentDir = isDeveloping ? 'client' : 'public';

app.get('/room/:roomId', function (req, res) {
    if (_.has(roomsById, req.params.roomId)) {
        res.send(JSON.stringify(roomsById[req.params.roomId]));
    } else {
        res.status(500).send('No room with ID ' + req.params.roomId);
    }
});

app.get('/item', function (req, res) {
    const itemIds = req.query.ids.split(',');
    const itemData = _.reduce(itemIds, function(dataObj, itemId) {
        dataObj[itemId] = itemsById[itemId] || {};
        return dataObj;
    }, {});
    res.send(JSON.stringify(itemData));
});

app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, contentDir, 'index.html'));
});

app.listen(port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});
