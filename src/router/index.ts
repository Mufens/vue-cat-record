import { createRouter, createWebHistory } from 'vue-router'

import 'nprogress/nprogress.css'
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
          path: '/role-manage',
          component: () => import('@/views/manage/role-manage.vue'),
          name: 'role-manage',
          meta: { title: '角色管理', icon: 'icon-a-jiaoseguanli2' },
        },
        {
          path: '/message-board',
          component: () => import('@/views/board/message-board.vue'),
          name: 'message-board',
          meta: { title: '留言板', icon: 'icon-maojiazhengchangx' },
        },
        {
          path: '/user',
          component: () => import('@/views/user/UserProfile.vue'),
          name: 'user',
          meta: { title: '个人中心', icon: 'icon-personalcenter' },
        },
      ],
    },
    {
      path: '/403',
      component: () => import('@/views/pages/403-error.vue'),
      meta: { title: '没有权限' },
    },
    {
      path: '/404',
      component: () => import('@/views/pages/404-error.vue'),
      meta: { title: '页面不存在' },
    },
    { path: '/:path(.*)', redirect: '/404' },
  ],
})

export default router
