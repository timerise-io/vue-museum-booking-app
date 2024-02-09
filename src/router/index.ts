import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/confirmation/:bookingId',
      name: 'confirmation',
      component: () => import('../views/ConfirmationView.vue'),
      props: true
    }
  ]
})

export default router
