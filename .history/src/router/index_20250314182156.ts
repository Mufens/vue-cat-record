import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      children: [
        {
          path: '/overview',
          component: () => import('@/views/overview/table-all.vue'),
        },
      ],
    },
  ],
})

export default router
