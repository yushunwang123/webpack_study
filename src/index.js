// import add from './js/add.js';

// console.log(add(1, 2));
// import('./js/add').then(({ default : add}) => {
//     console.log(add(1, 2));
// }).catch(console.log);

// eslint-disable-next-line
import $ from 'jquery';
import add from './js/add';
import './css/index.css';
import './less/index.less';
// import add from './js/add';
// eslint-disable-next-line
console.log(add(1, 2));
// // 判断是否启动热更新
// if (module.hot) {
//   module.hot.accept('./js/add.js', () => {
//     // eslint-disable-next-line
//     console.log(add(1, 2));
//   });
// }
// eslint-disable-next-line
// console.log($);
// eslint-disable-next-line
// import(/* webpackChunkName: 'add' */'./js/add')
//     .then(({ add }) => {
//         // eslint-disable-next-line
//         console.log(add(1, 2));
//     })
//     .catch(() => {})
