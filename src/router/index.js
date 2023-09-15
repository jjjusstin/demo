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
    children: [] // 子路由动态添加
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

  // {
  //   path: '*',
  //   redirect: to => {
  //     if (to.path === '/login' || to.path === '/' || to.path === '/home/echart1') {
  //       return;
  //     }
  //     if (localStorage.getItem('token')) {
  //       console.log('有token');
  //       return '/home/echart1';
  //     } else {
  //       console.log('无token');
  //       return '/login';
  //     }
  //   },
  //   meta: {
  //     title: '重定向',
  //   },
  // },
  // 重定向   有bug加上重定向在刷新页面的时候 他好像是没获取到新的路由 导致无线重定向循环
  // {
  //   path: '*',
  //   redirect: ()=>{
  //     if(localStorage.getItem('token')){
  //       console.log('有token')
  //       return '/home/echart1'
  //     }else{
  //       console.log('无token')
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

// 清除动态添加的路由在退出登录的时候
// 如果不清除的话 退出登录的时候 会导致路由重复添加
// 但实际上 业务没有影响因为退出登陆的时候token也清除了,没有token的时候也是跳转到登录页面
// 但是为了保险起见 还是清除一下
// 这个函数用export { clearDynamicRoutes }导出了 在退出登录的时候调用
function clearDynamicRoutes() {
  const newRouter = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [  //恢复初始状态
      { // 主路由
        path: '/',
        name: 'main',
        redirect: '/home/echart1',
        meta: {
          title: '总路由',
          // requireAuth: true
        },
        component: () => import('../views/Main/index.vue'),
        children: [] // 子路由动态添加
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
     
    ] // 空的路由配置
  });
  
  router.matcher = newRouter.matcher;
}




router.beforeEach((to, from, next) => {
  
  // 如果用户已登录，或者访问的是登录页面，则直接放行
  if (localStorage.getItem('token') || to.path === '/login') {
    // console.log('路由守卫')
    next();
    return;
  }
  // 如果需要验证权限的页面
  if (to.meta.requireAuth) {
    next('/login');
  } else  {
    next(); // 其他页面直接放行
  }

});



export { clearDynamicRoutes }
export default router
