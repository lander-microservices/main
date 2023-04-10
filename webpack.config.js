const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const CompressionPlugin = require("compression-webpack-plugin");
require('dotenv').config();

const fs = require('fs');
try{
  fs.mkdirSync('./dist');
} catch(error){}
fs.copyFileSync('./src/_redirects', "./dist/_redirects");


const files = fs.readdirSync('./src/html/favicon');
const arr = Array.from(files);
arr.forEach((i)=> {
  fs.copyFileSync(`./src/html/favicon/${i}`, `./dist/${i}`);
})

fs.copyFileSync('./src/html/scripts.js', "./dist/scripts.js");;

const deps = require("./package.json").dependencies;
module.exports = {
  output: {
    publicPath: "https://lander-main-microservice.netlify.app/",
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
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
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
        landers: "lander@https://lander-component-microservice.netlify.app/remoteEntry.js",
        prelander: "prelander@https://preladner-micorservice.netlify.app/remoteEntry.js",
        advertorial: "advertorial@http://localhost:8088/remoteEntry.js"
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
      template: "./src/html/" + 'index' + '.html',
    }),
  ],
};