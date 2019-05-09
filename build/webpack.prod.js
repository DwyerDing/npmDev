let path = require("path");
let webpack = require("webpack");
let common = require("./webpack.common.js");
let merge = require("webpack-merge");
let autoprefixer = require("autoprefixer");
let cssnano = require("cssnano");
let UglifyJSPlugin = require("uglifyjs-webpack-plugin");
let ExtractTextPlugin = require("extract-text-webpack-plugin");

let postCssOptions = {
    plugins: loader => [
        autoprefixer("last 2 versions"),
        cssnano({
            zindex: false,
            discardComments: { removeAll: true },
            reduceIdents: { keyframes: false },
            discardUnused: { keyfames: false }
        })
    ]
};

module.exports = env => {
    let webpackConfig = {
        output: {
            publicPath: "/3dmap/",
            filename: "js/[name].js",
            chunkFilename: "js/[chunkhash].js"
        },
        module: {
            rules: [{
                    test: /\.css$/,
                    loaders: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            "css-loader",
                            { loader: "postcss-loader", options: postCssOptions }
                        ]
                    })
                },
                {
                    test: /\.scss$/,
                    loaders: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            "css-loader",
                            { loader: "postcss-loader", options: postCssOptions },
                            "sass-loader"
                        ]
                    })
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                "process.env.NODE_ENV": JSON.stringify("production"),
                RUN_DEV: JSON.stringify("prod")
            }),
            new ExtractTextPlugin({
                filename: "css/[chunkhash].css",
                allChunks: true
            }),
            new UglifyJSPlugin({ uglifyOptions: { output: { comments: false } } })
        ]
    };

    return merge.smart(common, webpackConfig);
};