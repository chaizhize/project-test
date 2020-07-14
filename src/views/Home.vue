<template>
    <div class="home">
        <ul class="homeul">
            <li @click="componentId = item" v-for="item in menu" :key="item">
                {{ item }}
            </li>
        </ul>
        <!-- <exif class="exif" /> -->
        <!-- <imageCorrect /> -->
        <!-- <textCorrect /> -->
        <component :is="componentId"></component>
    </div>
</template>

<script>
// @ is an alias to /src
// import exif from './exif';
// import imageCorrect from './imageCorrect';
// import textCorrect from './textCorrect';
// import go from 'gojs';
export default {
    // components: { exif, imageCorrect, textCorrect },
    components: {
        exif: () => import('./exif'),
        imageCorrect: () => import('./imageCorrect'),
        textCorrect: () => import('./textCorrect')
    },
    data() {
        return {
            menu: ['exif', 'textCorrect', 'imageCorrect'],
            componentId: 'exif'
        };
    },
    mounted() {},
    methods: {}
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
