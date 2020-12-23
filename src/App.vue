<!--
 * @Author: your name
 * @Date: 2020-11-04 19:37:24
 * @LastEditTime: 2020-12-22 11:47:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-cli3/src/App.vue
-->
<template>
    <div id="app">
        <fabricCanvas :currentType="{ size: 'big' }" @initFabricCanvas="init" @savesuccess="savesuccess" />
        <div id="nav">
            <el-button type="primary"><router-link to="/">home哈哈哈哈哈11111111111111111111</router-link></el-button>
            <el-button type="success"><router-link to="/about">About</router-link></el-button>
        </div>
        <router-view />
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    methods: {
        savesuccess(file) {
            console.log(JSON.stringify(file));
        },
        init(InitFabric) {
            var data = {
                version: '4.2.0',
                objects: [
                    {
                        type: 'ArrowLine',
                        version: '4.2.0',
                        originX: 'left',
                        originY: 'top',
                        left: 266,
                        top: 229,
                        width: 27,
                        height: 100,
                        fill: 'rgb(0,0,0)',
                        stroke: '#ff1e10',
                        strokeWidth: 3,
                        strokeDashArray: null,
                        strokeLineCap: 'butt',
                        strokeDashOffset: 0,
                        strokeLineJoin: 'miter',
                        strokeMiterLimit: 4,
                        scaleX: 1,
                        scaleY: 1,
                        angle: 0,
                        flipX: false,
                        flipY: false,
                        opacity: 1,
                        shadow: null,
                        visible: true,
                        backgroundColor: '',
                        fillRule: 'nonzero',
                        paintFirst: 'fill',
                        globalCompositeOperation: 'source-over',
                        skewX: 0,
                        skewY: 0,
                        x1: -13.5,
                        x2: 13.5,
                        y1: -50,
                        y2: 50
                    }
                ],
                background: 'rgba(0,0,0,0.1)'
            };
            const opt = {
                canvasData: data, // 渲染数据
                maxWidth: 1000, //最大宽度,
                bg: '#000'
            };
            this.FabricEl = new InitFabric(opt);
            console.log('this.FabricEl', this.FabricEl);
        }
    }
};
</script>
<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
ul,
li {
    list-style: none;
}
</style>

<style lang="scss">
.draw-brush {
    width: 46px;
    position: absolute;
    top: 0px;
    right: -46px;
    z-index: 9999;
    background: #f3f2f2;
    border: 1px solid #999;
    border-radius: 5px;
    & > .menu-item {
        border-bottom: 1px solid #999;
    }
    .menu-item {
        width: 46px;
        padding: 8px 0;
        text-align: center;
        position: relative;

        &.save-btn,
        &.cancel-btn {
            border-top: 1px solid #999;
        }
        .fa {
            font-size: 26px;
            cursor: pointer;
            color: #999;
        }
        .btn-txt {
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            &.save-txt {
                color: #1a9bff;
            }
            &.cancel-txt {
                color: #f56c6c;
            }
        }
        &.active {
            background: #ded8d8;
        }
        .item-config {
            display: none;
            flex-direction: column;
            width: 38px;
            position: absolute;
            background: #ffffff;
            border-radius: 5px;
            border: 1px solid #ddd;
            align-items: center;
            left: 48px;
            top: -95px;
            span {
                margin: 6px auto;
            }
            .size {
                border-radius: 50%;
                background: #c6c6c6;
                cursor: pointer;
                &.small {
                    width: 6px;
                    height: 6px;
                }
                &.normal {
                    width: 9px;
                    height: 9px;
                }
                &.big {
                    width: 12px;
                    height: 12px;
                }
                &.active,
                &:hover {
                    background: #00be00;
                }
            }
            .color {
                display: block;
                width: 7px;
                height: 7px;
                border: 4px solid transparent;
                cursor: pointer;
                box-sizing: content-box;
                &.red {
                    background: #ff1e10;
                    border-color: #ff1e10;
                }
                &.yellow {
                    background: #ffbe00;
                    border-color: #ffbe00;
                }
                &.blue {
                    background: #1a9bff;
                    border-color: #1a9bff;
                }
                &.green {
                    background: #1aad19;
                    border-color: #1aad19;
                }
                &.black {
                    background: #4d4d4d;
                    border-color: #4d4d4d;
                }
                &:hover,
                &.active {
                    background: #fff;
                }
            }
            &:before,
            &:after {
                content: ' ';
                position: absolute;
                border-left: 8px solid transparent;
                border-top: 8px solid transparent;
                border-right: 8px solid #d0d0d0;
                border-bottom: 8px solid transparent;
                left: -7px;
                top: 50%;
                margin-left: -10px;
            }
            &:after {
                border-right: 8px solid #fff;
                left: -6px;
            }
            &.active {
                display: flex;
            }
        }
    }
}
</style>
