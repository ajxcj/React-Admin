import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'antd/dist/antd.less'
import './assets/font/iconfont.css'
import { HashRouter } from 'react-router-dom';
import './utils/init-leancloud'//初始化Learncloud的SDK
import { Provider } from 'react-redux';//注入状态机
import store from "./store"//引入状态机对象

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <Provider store={store} >
      <App />
    </Provider>
  </HashRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
