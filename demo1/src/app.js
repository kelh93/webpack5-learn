import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { RightOutlined } from '@ant-design/icons';
// import zhCN from 'antd/lib/locale/zh_CN';
// import moment from 'moment';
// import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import './index.css';
import localImg from './assets/imgs/test.jpeg';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const login = () => {
    const params = {
      username,
      password,
    };
    console.log('login', params);
  };
  const onInputChange = (e, keyName) => {
    const { value } = e.target;
    if (keyName === 'username') {
      setUsername(value);
    } else {
      setPassword(value);
    }
    console.log('value', value);
  };
  return (
    <div className='app'>
      <div className='login-box'>
        <h1 className='title'>登录</h1>
        <Input className='username' placeholder='用户名' onChange={(e) => onInputChange(e, 'username')} />
        <Input className='password' type='password' placeholder='密码' onChange={(e) => onInputChange(e, 'password')} />
        <Button type='primary' onClick={login}>
          登录
        </Button>
        <img
          className='avatar'
          src='https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=111713540,615806613&fm=26&gp=0.jpg'
        />
        {/* <img src={localImg} /> */}
        <RightOutlined />
      </div>
    </div>
  );
};

export default App;
