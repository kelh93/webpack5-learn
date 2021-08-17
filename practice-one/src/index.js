import React from 'react';
import ReactDOM from 'react-dom';
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
