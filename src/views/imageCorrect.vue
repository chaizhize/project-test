<template>
    <div>
        <div class="correct">
            <p v-for="(item, index) in correctList" :key="index" @click="handleCorrectClick(item)" :id="item.id">{{ item.name }}</p>
        </div>
        <div id="canvas-container">
            <canvas id="canvasImage" width="600" height="400"></canvas>
            <canvas id="watermark_canvas" style="display: none;"></canvas>
        </div>
    </div>
</template>

<script>
import ImageCorrect from '@/utils/imageCorrect.js';
export default {
    components: {},
    data() {
        return {
            ImageCorrectObj: null,
            correctList: [
                {
                    name: '矩形',
                    id: 'isRect'
                },
                {
                    name: '圆形',
                    id: 'isCircle'
                },
                {
                    name: '画笔',
                    id: 'isLine'
                },
                {
                    name: '撤销',
                    id: 'Backout'
                },
                {
                    name: '反撤销',
                    id: 'UnBackout'
                },
                {
                    name: '清空',
                    id: 'Empty'
                },
                {
                    name: '原图切换',
                    id: 'Switch'
                }
            ]
        };
    },
    mounted() {
        // console.log(ImageCorrect, 'sss');
        // console.log(this, 'xxx');
        this.imgCorrectInit();
    },
    methods: {
        // imageCorrectInit() {
        //     console.log(222);
        //     ImageCorrect(document.getElementById('#canvasImage'));
        // },
        imgCorrectInit() {
            this.ImageCorrect = ImageCorrect(document.getElementById('canvasImage'));
            this.ImageCorrect.chooseImage('https://img.ivsky.com/img/tupian/li/202002/09/dongji-005.jpg'); //跨域图片
            this.ImageCorrect.chooseImage('https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=165325591,2666413465&fm=26&gp=0.jpg'); //跨域图片
        },
        handleCorrectClick(item) {
            if (item.id == 'isLine' || item.id == 'isRect' || item.id == 'isCircle') {
                this.ImageCorrect.chooseCurrentCorrent(item.id);
            } else {
                this.ImageCorrect['choose' + item.id]();
            }
        }
    }
};
</script>

<style lang="scss" scoped>
#canvasImage {
    display: block;
    margin: auto;
    border: 1px solid #333;
    overflow: hidden;
}
p {
    display: inline-block;
    cursor: pointer;
}
.active {
    border: 1px solid #ed4a3c;
}
#options {
    margin: 0 auto;
    /* text-align: center; */
}
.correct {
    display: flex;
    p {
        margin-right: 10px;
    }
}
#canvas-container {
    display: inline-block;
    position: relative;
}
.font-input {
    background-color: rgba(0, 0, 0, 0) !important;
    border: 1px solid red !important;
}
</style>
