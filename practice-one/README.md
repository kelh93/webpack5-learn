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


