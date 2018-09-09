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
        },
        {
            test: /\.css$/,
            loader:'style-loader!css-loader?importLoaders=1',
            //include: path.join(__dirname, 'src')
        },
        { 
            test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
            loader: 'url-loader?limit=100000' 
        }
      ]
  },
  plugins:[
    new HtmlWebpackPlugin({
        template:'src/index.html'
    })
  ]
};