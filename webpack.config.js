const path = require('path');

module.exports = {
  entry: {
    index: './clients/customer/index.js',
    service: './clients/service/index.js',
    kitchen: './clients/kitchen/index.js',
  },
  output: {
    filename: 'static/js/[name].bundle.js',
    path: path.join(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
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
};
