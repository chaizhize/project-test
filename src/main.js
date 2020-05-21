import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'normalize.css';
import './plugins';
Vue.config.productionTip = false; //阻止启动生产消息，常用作指令
Vue.prototype.$bus = new Vue(); // event Bus 用于无关系组件间的通信。
console.log(process.env.NODE_ENV, 'xxx');
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
