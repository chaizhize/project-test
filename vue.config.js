/*
 * @Author: your name
 * @Date: 2020-07-07 17:15:48
 * @LastEditTime: 2021-02-20 15:04:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-cli3/vue.config.js
 */
'use strict';
const path = require('path');
const cdnDomain = '/huodong1';
const isProduction = process.env.NODE_ENV !== 'development';
const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = {
    publicPath: process.env.ENV === 'production' ? cdnDomain : '/huodong1', //resolve('dist'),// 基本路径
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
    },
    configureWebpack: config => {
        // 生产环境相关配置
        if (isProduction) {
            //gzip压缩
            const productionGzipExtensions = ['html', 'js', 'css'];
            config.plugins.push(
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 10240, // 只有大小大于该值的资源会被处理 10240
                    minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
                    deleteOriginalAssets: false // 删除原文件
                })
            );
        }
    }
};
