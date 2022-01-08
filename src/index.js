import '@babel/polyfill';
import Header from './js/header.js';
import Content from './js/content.js';
import Avatar from './js/avatar.js';
import './css/index.css';
import './scss/index.scss';
import './js/request.js';
import './js/hot.hmr.js';
import './js/babel.es6.js';
import './ts/helloworld.ts';

const app = document.getElementById('app');
app.appendChild(new Header());
app.appendChild(new Content());
app.appendChild(new Avatar());

console.log(process.env.NODE_ENV)
console.log(test)