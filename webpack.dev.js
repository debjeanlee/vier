const config = require('./webpack.config');
const { DefinePlugin } = require('webpack');
const { merge } = require('webpack-merge');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');
const env = dotenv.config().parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = merge(config, {
  mode: 'development',
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    inline: true,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      chunks: ['index'],
    }),
    new HTMLWebpackPlugin({
      template: './public/index.html',
      filename: 'service/index.html',
      chunks: ['service'],
    }),
    new HTMLWebpackPlugin({
      template: './public/index.html',
      filename: 'kitchen/index.html',
      chunks: ['kitchen'],
    }),
    new DefinePlugin(envKeys),
  ],
});
