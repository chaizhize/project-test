import Vue from 'vue';
import { Button, Select, MessageBox, ColorPicker, Slider, Upload, Dialog } from 'element-ui';
Vue.use(Button)
    .use(Select)
    .use(ColorPicker)
    .use(Slider)
    .use(Upload)
    .use(Dialog);
Vue.prototype.$prompt = MessageBox.prompt;
