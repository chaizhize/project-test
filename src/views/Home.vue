<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <HelloWorld msg="111111111111111111111Welcome to Your Vue.js App22222222222222222222222" />
        <div>33333333333333333333333</div>
        <div>{{ msg }}</div>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
    components: {
        HelloWorld
    },
    data() {
        return {
            msg: process.env.NODE_ENV
        };
    },
    mounted() {}
};
</script>
