import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import store from '@/store';

// import { Message } from 'element-ui';

const service = axios.create({
    baseUrl: '',
    timeout: 40000,
    transformRequest: [data => qs.stringify(data)],
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    // withCredentials: true
});
// request拦截器
service.interceptors.request.use(
    config => {
        if (store.state.user.token) {
            config.headers['Authorization'] = `Bearer ${store.state.user.token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error.message);
    }
);

// respone拦截器
service.interceptors.response.use(
    response => {
        // const { code, data, err_msg, tips, statusCode, errmsg } = response.data;

        // if (code === 0 || code === 200 || statusCode === 0 || statusCode === 200) {
        return response.data;
        // } else {
        // let msg = tips || err_msg || errmsg;
        // Message.error(msg);
        //     return response.data;
        // }
    },
    error => {
        if (error.code === 'ECONNABORTED') {
            // Message.error('接口请求超时');
        }
        return Promise.reject(error.message);
    }
);

const URLS = {
    //业务接口
    baseUrl: process.env.VUE_APP_BASE_API
};

export default function(config) {
    const uri = URLS[config['type']];
    if (!uri) throw '未获取到该type对应的baseURL';
    config.baseURL = uri;
    return service(config);
}
