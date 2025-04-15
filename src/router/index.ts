import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useUserStore } from '@/stores/modules/user'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/LoginPage.vue'),
      meta: {
        noAuth: true,
      },
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
          meta: { title: '首页', icon: 'icon-shouye', permission: 'overview:view' },
        },
        {
          path: '/record',
          name: 'Record',
          component: () => import('@/views/record/cat-record.vue'),
          meta: { title: '记录', icon: 'icon-jilu', permission: 'record:view' },
        },
        {
          path: '/cat-manage',
          component: () => import('@/views/manage/cat-manage.vue'),
          name: 'cat-manage',
          meta: { title: '猫猫管理', icon: 'icon-claw', permission: 'cat:view' },
        },
        {
          path: '/user-manage',
          component: () => import('@/views/manage/user-manage.vue'),
          name: 'user-manage',
          meta: {
            title: '用户管理',
            icon: 'icon-Gc_32_line-UserManagement',
            permission: 'user:view',
          },
        },
        {
          path: '/role-manage',
          component: () => import('@/views/manage/role-manage.vue'),
          name: 'role-manage',
          meta: { title: '角色管理', icon: 'icon-a-jiaoseguanli2', permission: 'role:view' },
        },
        {
          path: '/message-board',
          component: () => import('@/views/board/message-board.vue'),
          name: 'message-board',
          meta: { title: '留言板', icon: 'icon-maojiazhengchangx', permission: 'message:view' },
        },
        {
          path: '/user',
          component: () => import('@/views/user/UserProfile.vue'),
          name: 'user',
          meta: { title: '个人中心', icon: 'icon-personalcenter', permission: 'user:view' },
        },
      ],
    },
    {
      path: '/403',
      component: () => import('@/views/pages/403-error.vue'),
      meta: { title: '没有权限', hidden: true },
    },
    {
      path: '/404',
      component: () => import('@/views/pages/404-error.vue'),
      meta: { title: '页面不存在', hidden: true },
    },
    { path: '/:path(.*)', redirect: '/404' },
  ],
})
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const userStore = useUserStore()
  if (!userStore.token) {
    const localToken = localStorage.getItem('token')
    if (localToken) userStore.setToken(localToken)
  }
  // 白名单路径（无需登录）
  const whiteList = ['/login', '/403', '/404']
  if (whiteList.includes(to.path)) {
    return next()
  }

  // 未登录处理
  if (!userStore.token) {
    return next('/login')
  }

  // 已登录状态权限检查
  try {
    // 确保用户信息已加载
    if (!userStore.user || userStore.permissions.length === 0) {
      await userStore.getUser() // 确保权限加载完毕
    }

    // 处理访问不存在的路由（如手动输入错误路径）
    if (to.matched.length === 0) {
      next('/404') // 跳转到404页
    } else if (to.meta.permission) {
      // 权限检查
      if (userStore.permissions.includes(to.meta.permission as string)) {
        next()
      } else {
        next('/403') // 无权限跳转
      }
    } else {
      next() // 放行无需权限的路由
    }
  } catch {
    userStore.removeToken()
    next('/login')
  }
})
router.afterEach(() => {
  NProgress.done()
})
export default router
