const { resolve, join } = require('path');
// 生产环境,提取css.
const isProductionMode = process.env.NODE_ENV === 'production';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'index-[chunkhash].js',
        path: resolve(__dirname, 'dist'),
        publicPath: ''
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
                                        ie: 10
                                    }
                                }
                            ],
                            '@babel/preset-react'
                        ],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
                // include: [resolve(__dirname, '/node_modules/antd')]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'demo1',
            filename: 'index.html',
            template: 'src/view/template.html'
        })
    ],
    devServer: {
        hot: true, //开启热更新
        proxy: {
            // 接口代理
            '/imgsys-web/api': {
                target: 'http://172.18.1.73:11102',
                pathRewrite: { '^/imgsys-web/api': '' }
            }
        }
    }
};
