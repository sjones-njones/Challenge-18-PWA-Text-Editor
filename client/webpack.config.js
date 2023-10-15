const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
// Added and configured workbox plugins for a service worker and manifest file.
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    // Added CSS loaders and babel to webpack.
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Webpack Plugin",
      }),
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "service-worker.js",
      }),
      new WebpackPwaManifest({
        name: "Just Another Text Editor",
        short_name: "JATE",
        description: "A text editor that allows on and off use.",
        background_color: "#7ee2ac",
        theme_color: "#7ee2ac",
        start_url: "/",
        publicPath: "/",
        fingerprints: false,
        inject: true,
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
