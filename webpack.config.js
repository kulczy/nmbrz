var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.join(__dirname, "www"),
  entry: "./main.js",
  devServer: {
      historyApiFallback: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }
    ]
  },
  output: {
    path: path.join(__dirname, "www"),
    filename: "main.min.js"
  },
  plugins:  [
      new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          "window.jQuery": "jquery"
      })
  ],
};
