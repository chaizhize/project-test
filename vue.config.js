'use strict';
const path = require('path');
// const cdnDomain = '//xxx.com/';
const cdnDomain = '/';
function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    publicPath: process.env.ENV === 'production' ? cdnDomain : '/', //resolve('dist'),// 基本路径
    outputDir: 'dist', // 打包输出文件目录
    assetsDir: 'static', //用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
    lintOnSave: false, // eslint-loader 是否在保存的时候检查
    productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
    css: {
        extract: true, // 是否使用css分离插件 ExtractTextPlugin
        sourceMap: false, // 开启 CSS source maps?
        loaderOptions: {
            postcss: {
                plugins: [
                    // require('postcss-pxtorem')({
                    //     // 把px单位换算成rem单位
                    //     rootValue: 75, // 换算的基数(设计图750的根字体为32)
                    //     propList: ['*'],
                    //     selectorBlackList: ['van']
                    // })
                    require('postcss-preset-env') //将最新的css转化为可以在生产环境使用的css代码
                ]
            }
        }
    },
    devServer: {
        port: process.env.port || process.env.npm_config_port || 6789, // 使用的端口
        proxy: {
            // 代理转发配置，用于调试环境
            '/demo': {
                target: 'http://localhost:7001',
                changeOrigin: true // 允许websockets跨域
            }
        },
        open: true, // 是否自动打开默认浏览器
        https: false, // 启用https
        progress: false, // 是否显示打包进度
        overlay: {
            // 错误、警告在页面弹出
            warnings: false,
            errors: true
        }
    },
    chainWebpack: config => {
        //分析打包的文件体积
        if (process.env.npm_config_report) {
            config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
        }
        config.plugins.delete('prefetch');
    },
    configureWebpack: {
        //调整 webpack 配置最
        name: '',
        resolve: {
            alias: {
                '@': resolve('src') // 使用@别名简写src目录所在的绝对路径
            }
        },
        externals: {}, // 自动解析确定的扩展。例如：import File from '../path/to/file'
        performance: {
            // 配置如何展示性能提示。例如，如果一个资源超过 250kb，webpack 会对此输出一个警告来通知你。
            maxEntrypointSize: 500000, //入口文件最大bytes（500k）
            maxAssetSize: 500000 //任何单文件最大bytes（500k）
        }
        // plugins: [new LodashModuleReplacementPlugin()]
    },
    // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
    transpileDependencies: []
};
