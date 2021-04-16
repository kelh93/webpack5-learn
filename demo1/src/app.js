import React from 'react';
import { Button, Input } from 'antd';
// import zhCN from 'antd/lib/locale/zh_CN';
// import moment from 'moment';
// import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import './index.css';

const App = () => {
    const login = () => {
        console.log('login');
    };
    return (
        <div className='app'>
            <Button onClick={login}>登录</Button>
        </div>
    );
};

export default App;
