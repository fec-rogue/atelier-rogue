require("dotenv").config();
const path = require('path');
<<<<<<< HEAD
// const HtmlWebpackPlugin = require('html-webpack-plugin');
var SRC_DIR = path.join(__dirname, "/client/src");

module.exports = {
  mode: 'development',
  entry: `${SRC_DIR}/index.js`,
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "/client/dist"),
=======
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, "/client/src/index.jsx"),
  output: {
    path: path.resolve(__dirname, "/client/dist"),
    filename: "bundle.js"
>>>>>>> main
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
<<<<<<< HEAD
};
=======
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "/client/dist/index.html"),
    }),
  ],
}
>>>>>>> main
