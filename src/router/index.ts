import { createRouter, createWebHistory } from 'vue-router'


const routes = [

    {
        path: '/',
        component: () => import('@/views/home/index.vue'),
        name: 'home',
    },
    {
        path: '/learning',
        component: () => import('@/views/learning/index.vue'),
        name: 'learning',
    },
    {
        path: '/settings',
        component: () => import('@/views/settings/index.vue'),
        name: 'settings',
    }

]

export default createRouter({
    history: createWebHistory(),
    routes,
})