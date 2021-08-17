import React, { useState } from 'react';
import { Button, Input, message } from 'antd';
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
    message.success('登录成功');
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
        <Input className='username' placeholder='admin' onChange={(e) => onInputChange(e, 'username')} allowClear />
        <Input
          className='password'
          type='password'
          placeholder='123456'
          onChange={(e) => onInputChange(e, 'password')}
          // 避免自动填充密码
          autoComplete='new-password'
          allowClear
        />
        <Button className='login-btn' type='primary' onClick={login}>
          登录
        </Button>
        <div className='helper'>
          <span className='helper-item forgot'>忘记密码？</span>
          <span className='helper-item register'>注册</span>
        </div>
        {/* <img
          className='avatar'
          src='https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=111713540,615806613&fm=26&gp=0.jpg'
        /> */}
        {/* <img src={localImg} /> */}
        {/* <RightOutlined /> */}
      </div>
    </div>
  );
};

export default App;
