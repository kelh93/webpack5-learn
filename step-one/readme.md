# webpack demo1
`recoil` 状态管理
`immer` 不可变数据
`antd` ui组件
`react` ui框架

react-hook

## 要支持的功能
- [ ] 支持postcss,对css做兼容处理. `css-loader`, `style-loader`
- [ ] `babel7.x`支持es6+等语言新特性.
- [ ] 搭建可用的react全家桶.
    -react@17.x
    -react-router
    -redux/recoil
- [x] Tree Shaking(webpack内置)
- [x] Split Chunk(webpack内置)
- [ ] ESlint 
- [ ] Stylint 
- [ ] 打包出不同的版本,`umd`、`cjs`、`esm`.
- [ ] UI框架 `antd`.配置按需加载.`babel-plugin-import`.
> -懒加载,保证最少的index.js文件大小.
> -优化启动时间.


## 项目依赖  
-"webpack": "^5.33.2",
-"webpack-cli": "^4.6.0"  
-@babel/preset-react 解决react.js的问题,比如jsx语法等  
点击进入babel官网查看[@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react)
## Css 处理
效果: postcss,css-loader,style-loader  
生产环境,提取css->`mini-css-extract-plugin`
## webpack配置相关 
**output**
-filename: 打包的文件名  
1. 使用入口名称  
```bash
    filename: "[name].bundle.js"
```
2.使用内部 chunk id  
```bash
    filename: "[id].bundle.js"
```
3.使用每次构建过程中，唯一的 hash 生成  
```bash
    filename: "[name].[hash].bundle.js"
```
4.使用基于每个 chunk 内容的 hash  
```bash
    filename: "[chunkhash].bundle.js"
```
-library: '', npm的包名
-libraryTarget: 
默认是'var',当做script标签的方式引用.
    -umd
    -amd (将你的 library 暴露为 AMD 模块)
    -commonjs2  
-**publicpath**
webpack-dev-server 也会默认从 publicPath 为基准，使用它来决定在哪个目录下启用服务，来访问 webpack 输出的文件。
> __webpack_public_path__ 在编译时(compile time)无法知道输出文件的 publicPath 的情况下，可以留空，然后在入口文件(entry file)处使用自由变量(free variable) __webpack_public_path__，以便在运行时(runtime)进行动态设置。

webpack-dev-server会读取`publicpath`配置,已`publicpath`作为服务启动目录,默认为空就可以正常启动服务.

-**devServer**
public
publicPath

## 遇到的问题
1. webpack5 + webpack-cli@4.x 报错 `Cannot find module 'webpack-cli/bin/config-yargs'`.  
解决: webpack-cli 降级 webpack-cli@3.3.12.
2. 开启热更新.
解决: devServer开启`hot:true`配置.
3. css文件无法正常解析.
4. 热更新无效  
```js
    module.exports = {
        //...
        devServer: {
            hot: true, //不生效，是因为没有配置target
        },
        target: 'web',// 配置web就可以了. 默认值为browserslist
    }
```
5. 
