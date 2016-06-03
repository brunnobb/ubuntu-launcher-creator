var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
require("babel-polyfill");
//require("jquery");
module.exports = {
    plugins: process.env.NODE_ENV === 'production' ? [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        /*new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),*/
        new ExtractTextPlugin("bundle.css", {
            allChunks: true
        }),
        new CopyWebpackPlugin([{
            from: './html'
        }, {
            from: './main',
        }, {
            from: './img',
            to: './img'
        }, {
            from: './static',
            to: './static'
        }])

    ] : [
        /*new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),*/
        new ExtractTextPlugin("bundle.css", {
            allChunks: true
        }),
        new CopyWebpackPlugin([{
            from: './html'
        }, {
            from: './main',
        }, {
            from: './img',
            to: './img'
        }, {
            from: './static',
            to: './static'
        }])
    ],
    entry: [
        'babel-polyfill',
        "./css/main.less",
        "./js/main.jsx"
    ],
    output: {
        path: '../electron/',
        filename: 'bundle.js',
        publicPath: './'
    },
    module: {
        loaders: [{
            test: /(\.js$|\.jsx?$)/,
            exclude: /(node_modules|public)/,
            loader: 'babel-loader?presets[]=es2015&presets[]=stage-0&presets[]=stage-1&presets[]=react&compact=false'
        }, {
            test: /\.css$/,
            exclude: /(node_modules|public)/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        }, {
            test: /\.less$/,
            exclude: /(node_modules|public)/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&minetype=application/font-woff"
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader"
        }, {
            test: /\.png/,
            loader: "url-loader?limit=100000&minetype=image/png"
        }, {
            test: /\.jpg/,
            loader: "file-loader"
        }, {
            test: /\.gif/,
            loader: "file-loader"
        }]
    },
}
