let path = require("path");
let webpack = require("webpack");
let merge = require("webpack-merge");
let common = require("./webpack.common.js");
let UglifyJsPlugin = require("uglifyjs-webpack-plugin");
let ImageminPlugin = require("imagemin-webpack-plugin").default;
let BundleAnalyzePlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;

let webpackConfig = {
    output: {
        publicPath: "/3dmap/",
        filename: "[name][chunhash].js",
        chunkFilename: "[name][chunkhash].js"
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        }),
        new ImageminPlugin(),
        new UglifyJsPlugin({
            uglifyOptions: {
                output: {
                    comments: false
                }
            }
        }),
        new BundleAnalyzePlugin()
    ]
};

module.exports = merge(common, webpackConfig);