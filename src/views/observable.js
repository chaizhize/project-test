/*
 * @Author: your name
 * @Date: 2020-11-25 11:33:19
 * @LastEditTime: 2020-11-25 13:59:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-cli3/src/views/observable.js
 */
// state: {
//     token: ''
// },
// getters: {
//     token: state => state.token
// },
// mutations: {
//     token: (state, token) => {
//         state.token = token;
//     }
// },
// actions: {}
import Vue from 'vue'
const obserableHome = {
    state: Vue.observable({
        count: 0
    }),
    mutations: {
        addCount: (count) => {
            obserableHome.state.count = count
        }
    }
}
export default obserableHome;