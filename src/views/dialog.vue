<!--
 * @Author: your name
 * @Date: 2020-11-04 19:44:39
 * @LastEditTime: 2020-11-25 11:06:38
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /vue-cli3/src/views/dialog.vue
-->
<!--  -->
<template>
    <div class="">
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" >
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button @click="handleClick">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    components: {},
    // props:['dialogVisible'],
    data() {
        return {
            dialogVisible:false
        };
    },
    computed: {},
    watch: {},
    methods: {
        handleClick(){
            this.$emit('parentClick','11111')
        }
    },
    created() {},
    mounted() {},
    beforeDestroy() {}
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
