/**
 * meta 配置参数
 * @param {string} title 页面标题
 * @param {boolean} icon 页面icon
 * @param {boolean} keepAlive 是否缓存页面
 */
export default [
  {
    path: '*',
    redirect: '/404'
  },
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
    redirect: 'statistics'
  },
  {
    path: '/statistics',
    component: () => import('../views/Statistics.vue')
  },
  {
    path: '/company-info',
    component: () => import('../views/CompanyInfo.vue')
  },
  {
    path: '/request-handle',
    component: () => import('../views/RequestHandle.vue')
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  }
];
