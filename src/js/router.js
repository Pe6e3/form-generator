import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/form-one', component: () => import('../components/MyForms/FormOne.vue')
    },
    {

        path: '/form-two', component: () => import('../components/MyForms/FormTwo.vue')
    },
    {
        path: '/form-three', component: () => import('../components/MyForms/FormThree.vue')
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router