<template>
    <div id="about">
        <div style="margin-bottom:30px">
            <canvas id="canvas" width="800" height="600"></canvas>
            <div class="danmuclass">
                <input type="text" v-on:keyup.13="tianjiaDanmo" placeholder="~说点什么吧~" v-model="value" id="ctx" />
                <span class="sendBtn" @click="tianjiaDanmo">发送</span>
            </div>

            <div class="danmuclass">
                弹幕颜色：
                <el-color-picker v-model="color1"></el-color-picker>
            </div>
            <div class="danmuclass">
                弹幕大小：
                <el-slider v-model="dmSize"></el-slider>
            </div>
            <div class="danmuclass">
                停留时间：
                <el-input-number v-model="pause" :min="1" :max="10" label="描述文字"></el-input-number>
            </div>
            <div class="danmuclass">
                整体弹幕速度：
                <el-slider v-model="moveSpeed"></el-slider>
            </div>
            <div class="danmuclass">
                单条弹幕速度：
                <el-slider :format-tooltip="formatTooltip" :max="10" :min="1" v-model="moveLength"></el-slider>
            </div>
        </div>

        <textCorrect />
    </div>
</template>
<script>
import Danmu from '@/utils/canvasdm.js';
import textCorrect from './textCorrect';
export default {
    components: {
        textCorrect
    },
    data() {
        return {
            value: '',
            dmSize: 30,
            color1: '#409EFF',
            moveSpeed: 10,
            moveLength: 2,
            pause: 3,
            danmu: null
        };
    },
    mounted() {
        this.danmuInit();

        window.onresize = () => {
            this.getWrapWH();
        };
    },
    methods: {
        getWrapWH() {
            if (!this.danmu) return;
            var h = document.querySelector('#about').clientHeight;
            var w = document.querySelector('#about').clientWidth;
            setTimeout(() => {
                this.danmu.resize(w, h);
            });
        },
        danmuInit() {
            var h = document.querySelector('#about').clientHeight;
            var w = document.querySelector('#about').clientWidth;
            console.log(h, w);
            this.danmu = new Danmu('#canvas', { h, w });
            console.log(this.danmu);
            setInterval(() => {
                var val = this.getRandomText();
                console.log(this.size, 'vvvvvv');
                const data = {
                    val,
                    dnColor: '#999' || this.color1,
                    dmSize: 30 || this.dmSize,
                    moveSpeed: this.moveSpeed,
                    moveLength: 2 || this.moveLength,
                    pause: 0
                };
                this.danmu.sendDanmu(data);
            }, 2000);
        },
        formatTooltip(val) {
            return val / 20;
        },
        tianjiaDanmo() {
            if (this.value.trim()) {
                console.log(this.color1, 'ppppppppp');

                const data = {
                    val: this.value,
                    dnColor: this.color1,
                    dmSize: this.dmSize,
                    moveSpeed: this.moveSpeed,
                    moveLength: this.moveLength,
                    pause: this.pause
                };
                this.danmu.sendDanmu(data);
                this.value = '';
            }
        },
        getRandomText() {
            var _a, _b, _c, _d;

            var _randomUniCode = Math.floor(Math.random() * (40870 - 19968) + 19968).toString(16);
            var _randomUniCode1 = Math.floor(Math.random() * (40870 - 19968) + 19968).toString(16);
            var _randomUniCode2 = Math.floor(Math.random() * (40870 - 19968) + 19968).toString(16);
            var _randomUniCode3 = Math.floor(Math.random() * (40870 - 19968) + 19968).toString(16);
            eval('_a=' + '"\\u' + _randomUniCode + '"');
            eval('_b=' + '"\\u' + _randomUniCode1 + '"');
            eval('_c=' + '"\\u' + _randomUniCode2 + '"');
            eval('_d=' + '"\\u' + _randomUniCode3 + '"');
            return _a + _b + _c + _d;
        }
    }
};
</script>
<style lang="scss">
#canvas {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 999;
}
.danmuclass {
    display: flex;
    align-items: center;
    .el-slider {
        width: 300px;
    }
}
#about {
    /* display: flex; */
    position: relative;
}
</style>
