require("dotenv").config();
const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, "/client/src/index.jsx"),
  output: {
    path: path.resolve(__dirname, "/client/dist"),
    filename: "bundle.js"
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
            //   ["@babel/plugin-transform-runtime",
            //     {
            //       "regenerator": true
            //     }
            //   ]
            // ]
          }
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "/client/dist/index.html"),
    }),
  ],
};
