/*
 * @Author: your name
 * @Date: 2020-07-07 17:15:48
 * @LastEditTime: 2020-12-24 14:16:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-cli3/vue.config.js
 */
'use strict';
const path = require('path');
const cdnDomain = '/vue2';

module.exports = {
    publicPath: cdnDomain, //resolve('dist'),// 基本路径
    outputDir: 'dist', // 打包输出文件目录
    assetsDir: 'static', //用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
    lintOnSave: false, // eslint-loader 是否在保存的时候检查
    css: {
        extract: false, // 是否使用css分离插件 ExtractTextPlugin
        sourceMap: false, // 开启 CSS source maps?
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-preset-env') //将最新的css转化为可以在生产环境使用的css代码
                ]
            }
        }
    }
};
