const config = require("./webpack.config");
const { DefinePlugin } = require("webpack");
const { merge } = require("webpack-merge");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(config, {
  mode: "development",
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    inline: true,
    historyApiFallback: true,
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      chunks: ["index"],
    }),
    new HTMLWebpackPlugin({
      template: "./public/index.html",
      filename: "crews/index.html",
      chunks: ["crews"],
    }),
    new HTMLWebpackPlugin({
      template: "./public/index.html",
      filename: "kitchen/index.html",
      chunks: ["kitchen"],
    }),
    new DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
});
