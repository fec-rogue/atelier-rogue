const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ENTRY_DIR = path.join(__dirname, "/client/src/index.jsx");
const OUTPUT_DIR = path.join(__dirname, "/client/dist");
const TEMPLATE_DIR = path.join(__dirname, "/client/src/index.html");
//test

module.exports = {
<<<<<<< HEAD
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
=======
  entry: ENTRY_DIR,
  output: {
    path: OUTPUT_DIR,
    filename: "bundle.js"
>>>>>>> main
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
<<<<<<< HEAD
      template: path.join(__dirname, "client", "dist", "index.html"),
=======
      template: TEMPLATE_DIR,
>>>>>>> main
    }),
  ],
}