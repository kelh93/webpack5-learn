const baseConfig = require('./webpack.base');
const { merge } = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

console.log('_dir', path.resolve(__dirname, '../src/index.js'));

const devConfig = {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  target: 'web', // 修改之后要刷新页面
  entry: {
    app: path.resolve(__dirname, '../src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[contenthash].js',
  },
  cache: {
    type: 'filesystem',
    allowCollectingMemory: true,
    buildDependencies: {
      // This makes all dependencies of this file - build dependencies
      config: [__filename],
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '页面标题',
      template: path.resolve(__dirname, '../public/index.html'),
    }),
  ],
  experiments: {
    // @babel/plugin-syntax-top-level-await
    topLevelAwait: true, // await不再需要async配套使用
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
      utils: path.resolve(__dirname, '../src/utils'),
      assets: path.resolve(__dirname, '../src/assets'),
      common: path.resolve(__dirname, '../src/common'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
  },
};

module.exports = merge(baseConfig, devConfig);
