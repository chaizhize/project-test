/*
 * @Author: your name
 * @Date: 2020-07-07 17:15:48
 * @LastEditTime: 2020-11-25 11:22:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-cli3/src/plugins/element-ui.js
 */
import Vue from 'vue';
import { Button, Select, MessageBox, ColorPicker, Slider, Upload, Dialog, Image, InputNumber, Loading, Input } from 'element-ui';
Vue.use(Button)
    .use(Select)
    .use(ColorPicker)
    .use(Slider)
    .use(Upload)
    .use(Dialog)
    .use(Image)
    .use(Input)
    .use(Loading)
    .use(InputNumber);
Vue.prototype.$prompt = MessageBox.prompt;