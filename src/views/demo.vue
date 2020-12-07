<template>
    <div class="">
        <el-input v-model="count"></el-input>
        <el-button @click="handler(count + 1)">
            哈哈哈哈哈
        </el-button>
    </div>
</template>

<script>
import obserableHome from './observable';
const { state, mutations } = obserableHome;
export default {
    components: {},
    data() {
        return {
            eventName: 'click',
            obj: {}
        };
    },
    computed: {
        count() {
            return state.count;
        }
    },
    watch: {},
    methods: {
        handler: mutations.addCount
    },
    created() {
        this.obj = Object.freeze({
            a: 1
        });
    },
    mounted() {
        this.obj = {
            b: 2
        };
        console.log(this.obj, 'xxxxxxx');

    },
    beforeDestroy() {}
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
