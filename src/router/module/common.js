export default [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        meta: { title: '首页' },
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
    },
    {
        path: '/about',
        name: 'About',
        meta: { title: '关于页面' },
        component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
    }
];
