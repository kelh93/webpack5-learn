# webpack5 practice

## 创建项目
1. 创建`package.json`文件。
```bash
yarn init -y 
```
2. 安装依赖 `webpack`、`webpack-cli`
```bash
yarn add webpack webpack-cli -D
```
3. 新建`src`目录。
webpack5 默认 `entry`是 `project_root/src/index.js`
4. 新建 `build/webpack.base.js`、`build/webpack.dev.js`、`build/webpack.prod.js` 
`build/webpack.base.js` 
通用配置，包含 js、css、splitchunk等处理。 
`build/webpack.dev.js` 
开发环境配置，`devServer`。
`build/webpack.prod.js` 
生产环境配置。 
> 使用`webpack-merge`插件将 base、dev，base、prod进行合并。
5. 安装loader，解析非js文件 
- JS
  - @babel/core @babel/cli @babel/preset-env 

- CSS 
  - style-loader 
  - css-loader 
  - less-loader 
  - postcss-loader 
开启`css-module`防止css冲突。使用`postcss`可以用cssnext语法。 

6. 安装 `webpack-dev-server` 搭建开发环境


## 相关知识

### Babel集成 
最少要安装3个包：
- @babel/core 
- @babel/preset-env
- babel执行器 (@babe/cli、babel-loader、@rollup/plugin-babel) 

#### presets的执行顺序
执行顺序是从后往前，`@babel/preset-react`处理react相关语法，里面会包含es6语法，再将es6语法通过`@babel/preset-env`转换成es5 




## 遇到的问题 
1. webpack-dev-server 和 html-webpack-plugin 集成，未正确显示页面，没有加载生成的js文件。
ps: webpack-dev-server版本是4.0.0-rc.1, 降级至@3.11.2 报错 Cannot find module 'webpack-cli/bin/config-yargs'

2. Cannot find module 'webpack-cli/bin/config-yargs'
使用webpack5 要修改 webpack-dev-server启动命令为 `webpack serve --config config/webpack.dev.js`

3. 配置`entry`错误 
```javascript
module.exports = {
  //...
  entry: '../src/index.js'
};
```
报错 `Module not found: Error: Can't resolve '../src/index.js' in '/Volumes/DeskTop/Documents/github/kelh93/webpack5-toolkit/practice-one'Can't resolve '../src/index.js'` ，是由于路径配置错误。得使用path保证正确的目录。
```javascript
module.exports = {
  //...,
  entry: path.resolve(__dirname, '../src/index.js')
};
``` 
修改之后正常，一定要注意路径问题。 
4. 安装`antd`，配置了`css module`后，antd样式不生效。
由于在webpack.base.js中配置了css module，就将antd里面的less、css也进行了转化，导致className不一致无法正常加载样式。
如果使用`exclude: /node_modules/`会使得less文件报错:`.bezierEasingMixin() Inline JavaScript is not enabled.`。
解决办法：再新增一个css、less的解析规则。区分开业务代码css和框架css。 
只保留核心代码
```js
module.exports = {
      {
        test: /\.(less|css)$/,
        exclude: /node_modules/, // 不处理第三方模块的css、less
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
            },
          },
           'postcss-loader'
          ,
          'less-loader'
        ],
      },
      {
        test: /\.(less|css)/,
        exclude: [/src/], // 专门给antd配置一套css解析规则，此规则不包含业务代码
        use: ['style-loader', 'css-loader', {
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
        }],
      },
}
```
6. 配置DLL，添加第三方插件的构建缓存，加快构建速度。
未开启cache，构建速度 47659ms。像 `react、react-dom、antd`等第三方插件是不会发生变化的，所以可以将构建结果缓存起来，避免每次启动服务都去构建。


