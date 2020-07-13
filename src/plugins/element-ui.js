import Vue from 'vue';
import { Button, Select, MessageBox, ColorPicker, Slider, Upload, Dialog, Image, InputNumber } from 'element-ui';
Vue.use(Button)
    .use(Select)
    .use(ColorPicker)
    .use(Slider)
    .use(Upload)
    .use(Dialog)
    .use(Image)
    .use(InputNumber);
Vue.prototype.$prompt = MessageBox.prompt;
