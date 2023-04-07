const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const CompressionPlugin = require("compression-webpack-plugin");
require('dotenv').config();

const fs = require('fs');
try {
  fs.mkdirSync('./dist')
} catch (error) { }
fs.copyFileSync('./src/_redirects', "./dist/_redirects");;
const files = fs.readdirSync('./src/html/favicon');
const arr = Array.from(files);
// ('./src/html/favicon', "./dist/favicon");

const deps = require("./package.json").dependencies;
module.exports = {
  output: {
    publicPath: "http://localhost:8080/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 8080,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "main",
      filename: "remoteEntry.js",
      remotes: {
        components: "components@http://localhost:8084/remoteEntry.js",
        landers: "lander@http://localhost:8082/remoteEntry.js",
        prelander: "prelander@http://localhost:8086/remoteEntry.js"
      },
      exposes: {},
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new CompressionPlugin(),
    new HtmlWebPackPlugin({
      template: './src/html/index.html',
    }),
  ],
};
