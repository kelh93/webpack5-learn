const baseConfig = require('./webpack.base');
const { merge } = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const prodConfig = {
  mode: 'production',
  // devtool: 'inline-source-map',
  optimization: {
    minimize: true, // 是否压缩
    minimizer: [
      // 压缩器
      new TerserPlugin({
        parallel: true,
        extractComments: false, // 🙅‍♂️生成license文件
      }),
    ],
  },
  entry: {
    app: path.resolve(__dirname, '../src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[contenthash].js',
    clean: true, // 清除上一次的结果
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '页面标题',
      template: path.resolve(__dirname, '../public/index.html'),
    }),
  ],
};

module.exports = merge(baseConfig, prodConfig);
