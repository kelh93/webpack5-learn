import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider, DatePicker, message } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import './assets/base.less';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

const word = 'hello webpack5';
console.log('hi', word);

// spread
const spread = {
  name: 'kelh',
  country: 'china',
  address: 'sz',
};

function getName({ name }) {
  return name;
}

const _name = getName(spread);

console.log('_name', _name);

const p1 = new Promise((resolve, reject) => {
  resolve('resolve');
});
p1.then((data) => {
  console.log('data');
});
