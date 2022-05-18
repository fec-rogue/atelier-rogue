const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
var SRC_DIR = path.join(__dirname, "/client/src");

module.exports = {
  mode: 'development',
  entry: `${SRC_DIR}/index.js`,
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "/client/dist"),
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            // plugins: [
            //   new HtmlWebpackPlugin({
            //     template: path.join(__dirname, "/client/src", "index.html"),
            //   }),
            // ],
            plugins: [
              ["@babel/plugin-transform-runtime",
                {
                  "regenerator": true
                }
              ]
            ]
          }
        }
      },
    ]
  },

};