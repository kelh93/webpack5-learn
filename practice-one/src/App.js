import React, { useEffect } from 'react';
import { Button, message } from 'antd';
import style from './index.less';
import editIcon from 'assets/imgs/copy@2x.png';
import bgImage from 'assets/imgs/no_message@2x.png';

const App = () => {
  useEffect(() => {
    // const res = await fetch('/api/getData');
    // console.log('res', res);
  }, []);

  const btnClick = () => {
    message.info('点击了按钮123');
  };

  const forgetPwd = () => {
    message.info('忘记密码');
  };

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
      <div className='imgs'>
        <img src={editIcon} alt='' />
        <img src={bgImage} alt='' />
      </div>
      <div className={style.bgIcon}></div>
      <Button type='primary' onClick={btnClick} style={{ marginRight: 20 }}>
        点击登录
      </Button>
      <Button type='primary' onClick={forgetPwd}>
        忘记密码
      </Button>
    </div>
  );
};

export default App;
