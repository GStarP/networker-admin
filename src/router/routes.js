/**
 * meta 配置参数
 * @param {string} title 页面标题
 * @param {boolean} icon 页面icon
 * @param {boolean} keepAlive 是否缓存页面
 */
export default [
  {
    path: '/404',
    name: '找不到页面',
    component: () => import('../views/ErrorPage.vue'),
    meta: {
      title: '找不到页面',
      keepAlive: true
    }
  },
  {
    path: '/',
    component: () => import('../views/Home.vue'),
    meta: {
      title: '主页'
    }
  },
  {
    path: '/about',
    component: () => import('../views/About.vue'),
    meta: {
      title: '关于'
    }
  },
  {
    path: '*',
    redirect: '/404'
  }
]
