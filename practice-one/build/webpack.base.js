const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssNormalize = require('postcss-normalize');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader', // plugin 和 options 在.babelrc里面进行配置
      },
      {
        test: /\.(less|css)$/,
        exclude: /node_modules/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2, // 代表执行css-loader之前需要执行几次其他loader
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
                // localIdentContext: path.resolve(__dirname, '../src'), // 相当于指定了[path]就是src,生成的className会忽略[path]
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      autoprefixer: true,
                    },
                  ],
                  postcssNormalize(),
                ],
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {
                  'primary-color': '#1DA57A',
                  'link-color': '#1DA57A',
                  'border-radius-base': '2px',
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(less|css)/,
        exclude: [/src/], // 专门给antd配置一套css解析规则
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {
                  'primary-color': '#1DA57A',
                  'link-color': '#1DA57A',
                  'border-radius-base': '2px',
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        // More information here https://webpack.js.org/guides/asset-modules/
        type: 'asset',
      },
    ],
  },
  plugins: [].concat(devMode ? [] : [new MiniCssExtractPlugin()]),
};
