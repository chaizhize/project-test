import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import createLogger from 'vuex/dist/logger';
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

// 自动导入module下所有模块
const modules = (modulesFiles => {
    return modulesFiles.keys().reduce((modules, modulePath) => {
        const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
        const value = modulesFiles(modulePath);
        modules[moduleName] = value.default;
        return modules;
    }, {});
})(require.context('./module', false, /\.js$/));

//解决vuex刷新浏览器重置state
const createPersisted = createPersistedState({
    key: 'saveStore',
    reducer(module) {
        return {
            common: module.common
        };
    }
});

const store = new Vuex.Store({
    modules,
    plugins: debug ? [createLogger(), createPersisted] : [createPersisted]
});

export default store;
