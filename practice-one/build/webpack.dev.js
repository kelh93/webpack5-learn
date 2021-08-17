const baseConfig = require('./webpack.base');
const { merge } = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

console.log('_dir', path.resolve(__dirname, '../src/index.js'));

const devConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    app: path.resolve(__dirname, '../src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[contenthash].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '页面标题',
      template: path.resolve(__dirname, '../public/index.html'),
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
  },
};

module.exports = merge(baseConfig, devConfig);
