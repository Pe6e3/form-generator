import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        // path: '/', component: () => import('../App.vue'),
        path: '/form', component: () => import('../components/FormGenerator.vue')
    }
]   

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router