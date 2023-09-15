import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  { // 主路由
    path: '/',
    name: 'main',
    redirect: '/home/echart1',
    meta: {
      title: '总路由',
      // requireAuth: true
    },
    component: () => import('../views/Main/index.vue'),
    children: [ // 子路由
    {
      path: 'home',
      name: 'home',
      redirect: '/home/echart1', // 重定向
      meta: {
        title: '首页',
        requireAuth: true

      },
      component: () => import('@/views/Home/index.vue'),
      children: [
        {
          path: 'echart1',
          name: 'echart1',
          meta: {
            title: '图表1',
            requireAuth: true

          },
          component: () => import('@/views/Home/compoents/echart1.vue'),
        },
        {
          path: 'echart2',
          name: 'echart2',
          meta: {
            title: '图表2',
            requireAuth: true

          },
          component: () => import('@/views/Home/compoents/echart2.vue'),
        },
        {
          path: 'echart3',
          name: 'echart3',
          meta: {
            title: '图表3',
            requireAuth: true

          },
          component: () => import('@/views/Home/compoents/echart3.vue'),
        }
      ]



    },
    {
      path: 'user',
      name: 'user',
      meta: {
        title: '用户',
        requireAuth: true

      },
      component: () => import('@/views/User/index.vue')
    },
    {
      path: 'mall',
      name: 'mall',
      meta: {
        title: '商城',
        requireAuth: true

      },
      component: () => import('@/views/Mall/index.vue')
    },
    {
      path: 'page1',
      name: 'page1',
      meta: {
        title: '其他1',
        requireAuth: true

      },
      component: () => import('@/views/Other/otherOne.vue')
    },
    {
      path: 'page2',
      name: 'page2',
      meta: {
        title: '其他2',
        requireAuth: true

      },
      component: () => import('@/views/Other/otherTwo.vue')
    },

  ]

  },
  
  //登录
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
    },
    component: () => import('../views/Login/index.vue')
  },
  //注册
  {
    path: '/register',
    name: 'register',
    meta: {
      title: '注册',
    },
    component: () => import('../views/Register/index.vue')
  },
  //忘记密码
  {
    path: '/forget',
    name: 'forget',
    meta: {
      title: '忘记密码',
    },
    component: () => import('../views/Forget/index.vue')
  },
  // 重定向
  // {
  //   path: '*',
  //   redirect: ()=>{
  //     if(localStorage.getItem('token')){
  //       console.log('token存在')
  //       return '/home/echart1'
  //     }else{
  //       console.log('token不存在')
  //       return '/login'
  //     }
  //   }, // 重定向
  //   meta: {
  //     title: '重定向',
  //   },
  // },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  // 如果用户已登录，或者访问的是登录页面，则直接放行
  if (localStorage.getItem('token') || to.path === '/login') {
    console.log('路由守卫')
    next();
    return;
  }
  
  // 如果需要验证权限的页面
  if (to.meta.requireAuth) {
    next('/login');
  } else {
    next(); // 其他页面直接放行
  }
});

export default router
