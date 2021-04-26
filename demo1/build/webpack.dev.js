const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = () => {
  const devConfig = {
    mode: 'development',
    plugins: [
      new HtmlWebpackPlugin({
        title: 'demo1',
        filename: 'index.html',
        template: 'src/view/template.html',
        inject: true,
        chunks: ['index', 'react', 'antd'],
      }),
      new BundleAnalyzerPlugin(),
    ],
    devServer: {
      // contentBase: path.resolve(__dirname, 'dist'),
      hot: true, //开启热更新
      // devtool: 'inline-source-map',
      proxy: {
        // 接口代理
        '/imgsys-web/api': {
          target: 'http://172.18.1.73:11102',
          pathRewrite: { '^/imgsys-web/api': '' },
        },
      },
    },
  };
  return merge(baseConfig, devConfig);
};
