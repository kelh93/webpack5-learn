import React from 'react';
import { Button } from 'antd';
import style from './index.less';

const App = () => {
  return (
    <div className='app'>
      <h1 className={style.title}>webpack5脚手架</h1>
      <h2 className={style.author}>by @Ryan.ke</h2>
      <ul>
        <li className={style.frame}>使用的框架：</li>
        <li className={style.pluginItem}>react</li>
        <li className={style.pluginItem}>react-dom</li>
        <li className={style.pluginItem}>Antd 4.x</li>
      </ul>
      <Button type='primary'>点击登录</Button>
    </div>
  );
};

export default App;
