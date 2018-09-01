const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entry: {
    "app.js":'./src/index.js'
  },
  output: {
    filename: '[name]',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
      contentBase: './dist'
  },
  mode:'development',
  module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        },
        {
            test: /\.php$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                    }
                }
            ]
        }
      ]
  },
  plugins:[
    new HtmlWebpackPlugin({
        template:'src/index.html'
    }),
    new webpack.NormalModuleReplacementPlugin(/service/, function (resource) {
        resource.request = resource.request.replace(/service.js/, `mock.js`);
    })
  ]
};
