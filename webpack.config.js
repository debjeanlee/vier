const path = require('path');
const { DefinePlugin } = require('webpack');
const dotenv = require('dotenv');
const env = dotenv.config().parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  entry: {
    index: './clients/customer/index.js',
    service: './clients/service/index.js',
    kitchen: './clients/kitchen/index.js',
  },
  output: {
    filename: 'static/js/[name].bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      buffer: 'buffer',
      crypto: 'crypto-browserify',
      http: 'stream-http',
      https: 'https-browserify',
      path: 'path-browserify',
      stream: 'stream-browserify',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(png|jp(e*)g|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [new DefinePlugin(envKeys)],
};
