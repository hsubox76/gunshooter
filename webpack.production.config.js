var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractCSS = new ExtractTextPlugin('font.css');
var extractSASS = new ExtractTextPlugin('bundle.css');

var nodeModulesPath = path.resolve(__dirname, 'node_modules');

var BUILD_DIR = path.resolve(__dirname, 'public/build');
var APP_DIR = path.resolve(__dirname, 'client/app');

var config = {
    devtool: 'source-map',
    resolve: {
        modulesDirectories: ['node_modules', 'bower_components'],
        extensions: ['', '.js', '.jsx']
    },
    entry: APP_DIR + '/index.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: APP_DIR,
                loaders: ['react-hot', 'babel']
            },
            {
                test: /\.css$/,
                loader: extractCSS.extract('style', 'css')
            },
            {
                test: /\.scss$/,
                loader: extractSASS.extract('style', 'css!sass')
            },
            {
                test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
                loader: 'url'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
        ),
        new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
        }),
        extractCSS,
        extractSASS
    ],
    sassLoader: {
        includePaths: [path.resolve(__dirname, 'src/client/app/styles')]
    }
};

module.exports = config;