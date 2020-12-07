<template>
    <div class="home">
        <div @click="handleclick">{{ count }}</div>
        <ul class="homeul">
            <li @click="componentId = item" v-for="item in menu" :key="item">
                {{ item }}
            </li>
        </ul>
        <!-- <exif class="exif" /> -->
        <!-- <imageCorrect /> -->
        <!-- <textCorrect /> -->
        <elDialoge @parentClick="parentClick" />
        <component @hook:mounted="hookMounted" @hook:beforeUpdate="hookbeforeUpdated" @hook:updated="hookUpdate" v-loading="loading" :is="componentId"></component>
    </div>
</template>

<script>
import elDialoge from './dialog';
import obserableHome from './observable';

export default {
    // components: { exif, imageCorrect, textCorrect },
    components: {
        exif: () => import('./exif'),
        textCorrect: () => import('./textCorrect'),
        demo: () => import('./demo'),
        elDialoge
    },
    data() {
        return {
            menu: ['exif', 'textCorrect', 'demo'],
            componentId: 'demo',
            loading: true,
            num:1
        };
    },
    computed: {
        count() {
            return obserableHome.state.count;
        }
    },
    created() {
    },
    mounted() {
        console.log(obserableHome,'fmkdk');

         window.addEventListener('storage', function(e) {
            console.log(e.newValue,'e.newValue');
        });
    },
    methods: {
        handleclick(){
            console.log('1111111');
            localStorage.setItem('test', this.num++);
        },
        parentClick(e) {},
        hookMounted() {
            this.loading = false;
            console.log('hookMounted');
        },
        hookbeforeUpdated() {
            this.loading = true;
            console.log('hookbeforeUpdated');
        },
        hookUpdate() {
            console.log('hookUpdate');
            setTimeout(() => {
                this.loading = false;
            }, 500);
        }
    }
};
</script>
<style lang="scss">
.home {
    // display: flex;
    .exif {
        margin-right: 20px;
    }
    .homeul {
        display: flex;
        margin-bottom: 30px;
        justify-content: center;
        li {
            margin-right: 10px;
        }
    }
}
</style>
