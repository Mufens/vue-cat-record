import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/overview',
      children: [
        {
          path: '/overview',
          component: () => import('@/views/overview/table-all.vue'),
        },
        {
          path: '/record',
          component: () => import('@/views/record/cat-record.vue'),
        },
        {
          path: '/cat-manage',
          component: () => import('@/views/manage/cat-manage.vue'),
        },
        {
          path: '/user-manage',
          component: () => import('@/views/manage/user-manage.vue'),
        },
      ],
    },
  ],
})

export default router
