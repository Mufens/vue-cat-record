import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/LoginPage.vue'),
    },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/overview',
      children: [
        {
          path: '/overview',
          name: 'Overview',
          component: () => import('@/views/overview/contain-all.vue'),
          meta: { title: '首页', icon: 'icon-shouye' },
        },
        {
          path: '/record',
          name: 'Record',
          component: () => import('@/views/record/cat-record.vue'),
          meta: { title: '记录', icon: 'icon-jilu' },
        },
        {
          path: '/cat-manage',
          component: () => import('@/views/manage/cat-manage.vue'),
          name: 'cat-manage',
          meta: { title: '猫猫管理', icon: 'icon-claw' },
        },
        {
          path: '/user-manage',
          component: () => import('@/views/manage/user-manage.vue'),
          name: 'user-manage',
          meta: { title: '用户管理', icon: 'icon-Gc_32_line-UserManagement' },
        },
        {
          path: '/message-board',
          component: () => import('@/views/board/message-board.vue'),
          name: 'message-board',
          meta: { title: '留言板', icon: 'icon-Gc_32_line-UserManagement' },
        },
      ],
    },
  ],
})

export default router
