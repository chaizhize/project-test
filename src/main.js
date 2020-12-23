/*
 * @Author: your name
 * @Date: 2020-12-07 19:12:16
 * @LastEditTime: 2020-12-21 14:05:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-cli3/src/main.js
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'normalize.css';
import './plugins';
Vue.config.productionTip = false; //阻止启动生产消息，常用作指令
// Vue.prototype.$bus = new Vue(); // event Bus 用于无关系组件间的通信。
console.log(process.env.NODE_ENV, 'xxx');

import FabricCanvas from 'draw-image-editor';
import 'draw-image-editor/lib/FabricCanvas.css';
Vue.use(FabricCanvas);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
