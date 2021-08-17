module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader', // plugin 和 options 在.babelrc里面进行配置
      },
    ],
  },
};
