const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    output: {
        publicPath: "/"
    },
    devtool: "source-map",
    mode: "development",
    devServer: {
        proxy: {
            "/": {
                target: "https://skynet.ipplus360.com",
                changeOrigin: true
            }
        },
        host: "localhost",
        port: 3001,
        open: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
    }
});