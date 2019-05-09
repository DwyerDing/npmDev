const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: {
    vendors: ["axios"],
    react_vendors: [
      "react",
      "react-dom",
      "react-router-dom",
      "react-loadable",
      "mobx",
      "mobx-react"
    ],
    index: "./src/app/app.js"
  },
  // entry: {
  //     projector: "./src/common/threejslibs/Projector.js",
  //     stats: "./src/common/threejslibs/stats.min.js",
  //     vendor: ["react"],
  //     common: "./src/components/index.js"
  // },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "js/[name][hash].js",
    chunkFilename: "js/[name][hash].js"
  },
  resolve: {
    extensions: [
      ".js",
      "html",
      ".jsx",
      "sass",
      "scss",
      "css",
      "png",
      "jpg",
      "jpeg",
      ".json"
    ],
    alias: {
      "@styles": path.resolve(__dirname, "../src/app/styles"),
      "@components": path.resolve(__dirname, "../src/app/components"),
      "@core": path.resolve(__dirname, "../src/app/core"),
      "@services": path.resolve(__dirname, "../src/app/services"),
      "@common": path.resolve(__dirname, "../src/app/common")
    }
  },
  optimization: {
    runtimeChunk: {
      name: "manifest"
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              presets: [
                [
                  "env",
                  {
                    targets: {
                      browsers: "> 5%" // ['last 2 versions', 'ie >= 9']a
                    },
                    module: false
                  }
                ],
                "stage-0",
                "react"
              ],
              plugins: ["transform-decorators-legacy"]
            }
          },
          "eslint-loader"
        ],
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|ico)$/,
        use: [
          {
            loader: "url-loader",
            query: {
              limit: 8192,
              name: "src/assets/images/[name].[ext]"
            }
          },
          "image-webpack-loader"
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        exclude: path.resolve(__dirname, "../src/assets/icons"),
        loader: "url-loader",
        query: {
          limit: 8192,
          name: "assets/fonts/[name].[ext]"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      filename: "index.html",
      inject: "body",
      template: "./src/app/app.html"
    })
  ],
  externals: {
    BMap: "BMap"
  },
  devServer: {
    host: "localhost",
    port: 3000,
    open: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization"
    }
  }
};
