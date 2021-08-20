const baseConfig = require('./webpack.base');
const { merge } = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
      new CssMinimizerPlugin({
        parallel: true, // cpu 核心 - 1
        minify: CssMinimizerPlugin.cleanCssMinify,
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true }, // 删除css注释
            },
          ],
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 20000, // 20kb
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      automaticNameDelimiter: '~', // 分包名称分隔符
      maxSize: 122880, // 分包大小超过maxSize则会被拆分 120kb
      cacheGroups: {
        react: {
          test: /[\\/]react|react-dom[\\/]/, // 将react、react-dom提取出来
          name: 'react', // 分包名称
          priority: 0,
        },
        antd: {
          test: /[\\/]antd[\\/]/,
          name: 'antd',
          priority: 0,
        },
        // defaultVendors: {
        //   test: /[\\/]node_modules[\\/]/,
        //   priority: -10,
        //   reuseExistingChunk: true,
        // },
        // default: {
        //   minChunks: 2,
        //   priority: -20,
        //   reuseExistingChunk: true,
        // },
      },
    },
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
    new BundleAnalyzerPlugin({ analyzerPort: 8081 }),
  ],
};

module.exports = merge(baseConfig, prodConfig);
