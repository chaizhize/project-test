<!--
 * @Author: your name
 * @Date: 2020-11-04 19:37:24
 * @LastEditTime: 2020-11-04 19:37:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-cli3/src/App.vue
-->
<template>
    <div id="app">
        11111111111111111111
        <div id="nav">
            
            <el-button type="primary"><router-link to="/">home哈哈哈哈哈11111111111111111111</router-link></el-button>
            <el-button type="success"><router-link to="/about">About</router-link></el-button>
        </div>
        <router-view />
    </div>
</template>

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
