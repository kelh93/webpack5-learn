const { resolve, join } = require('path');
module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: 'index-[chunkhash].js',
    path: resolve(__dirname, '../dist'),
    publicPath: '',
    // library: 'lib-name', // 如果编译npm包
    // libraryTarget: 'umd', // 输出的类型
  },
  module: {
    rules: [
      {
        test: /\.js|x$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    chrome: 58,
                    ie: 10,
                  },
                },
              ],
              '@babel/preset-react',
            ],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
        // include: [resolve(__dirname, '/node_modules/antd')]
      },
      {
        test: /\.(png|jpeg|gif)/,
        type: 'asset/resource',
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxSize: 1024 * 240, //告诉webpack将体积大于maxSize的文件分割成更小的模块
      minSize: 20000, //生成chunk的最小体积，单位是byte
      minRemainingSize: 0, // development,默认为0
      minChunks: 1, // 拆分前必须共享模块的最小chunks数
      maxAsyncRequests: 30, //按需加载时的最大并行请求数，默认30
      maxInitialRequests: 30, //入口点的最大并行请求数
      enforceSizeThreshold: 50000,
      cacheGroups: {
        // default: {
        //   minChunks: 2,
        //   priority: -20,
        //   reuseExistingChunk: true,
        // },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          filename: 'vendor.js',
          priority: -10,
          reuseExistingChunk: true,
          enforce: true,
        },
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react',
          filename: 'react.js',
          priority: -10,
          reuseExistingChunk: true,
        },
        antd: {
          test: /[\\/]node_modules[\\/](antd)[\\/]/,
          name: 'antd',
          filename: 'antd.js',
          priority: -10,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
