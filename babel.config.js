let plugins = [];
// 生成环境去掉console.log
if (process.env.VUE_APP_IS_DEBUG === 'false') {
    plugins.push('transform-remove-console');
}
//按需引用ui库
module.exports = {
    plugins: [
        [
            'component',
            {
                libraryName: 'element-ui',
                styleLibraryName: 'theme-chalk'
            }
        ],
        ...plugins
    ],
    presets: [['@babel/preset-env', { modules: false }]]
    // presets: ['@vue/app']
};
