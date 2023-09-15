import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routerList: [],//菜单
    userInfo: {},
  },
  getters: {
  },
  mutations: {
    // 设置路由权限
    setRouterAuthority(state, router) {
      state.routerList = router
    },
    // 设置用户信息
    setUserInfo(state, userInfo) {
      // console.log('store/index.js setUserInfo', userInfo)
      state.userInfo = userInfo
    },
    // 清除用户信息
    clearPersistedData(state) {
      state.routerList = [];
      state.userInfo = {};
    },
    addrouter(state, router) {
      
      function transformMenuData(menuItems) {
        return menuItems.map(item => {
          const transformedItem = {
            path: item.path || '',
            name: item.name || '',
            // redirect: item.redirect || '',
            meta: item.meta || {},
            component: () => import(`@/views${item.component}`),
          };
          if (item.redirect) {
            transformedItem.redirect = item.redirect;
          }
          if (item.children && item.children.length > 0) {
            transformedItem.children = transformMenuData(item.children);
          }

          return transformedItem;
        });


      }
      // 要后添加重定向 不然第一时间获取不到新添加的路由会导致重定向失败无限循环
      // let aa = transformMenuData(state.routerList)
      // aa.push(
      //   {
      //     path: '*',
      //     redirect: () => {
      //       if (localStorage.getItem('token')) {
      //         console.log('有token')
      //         return '/home/echart1'
      //       } else {
      //         console.log('无token')
      //         return '/login'
      //       }
      //     }, // 重定向
      //     meta: {
      //       title: '重定向',
      //     },
      //   }
      // )
      
      // aa.forEach(item => {
      //   // 
      //   router.addRoute('main', item);
      //   ;
      // })
////////////////////////////////////////////////////////////////////



transformMenuData(state.routerList).forEach(item => {
        router.addRoute('main', item);
      })
router.addRoute({
          path: '*',
          redirect: () => {
            if (localStorage.getItem('token')) {
              console.log('有token')
              return '/home/echart1'
            } else {
              console.log('无token')
              return '/login'
            }
          }, // 重定向
          meta: {
            title: '重定向',
          },
        });

      // 要后添加重定向 不然第一时间获取不到新添加的路由会导致重定向失败无限循环
      // onReady是在路由准备就绪时触发，即所有异步进程都完成，所有异步组件都被解析完毕，所有异步路由组件都被加载完毕。
      router.onReady(() => {
      })
      // router.addRoute({
      //   path: '*',
      //   name: '404',
      //   component: () => import('../views/404/index.vue'),
      // })


      // 查看路由是否添加成功
      // console.log(router.getRoutes());

    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
    key: 'allData',
    storage: window.localStorage,
  })]
})

  // plugins: [createPersistedState({
  //   key: 'routerList',  // 存储在本地存储或会话存储中的键名（可选，默认为 vuex）
  //   // paths: ['user'], // 要持久化的状态属性列表，按模块的命名空间路径来指定（可选）
  //   storage: window.localStorage, // 存储引擎，可以是 localStorage 或 sessionStorage，或者其他兼容 Storage 接口的对象（可选，默认为 localStorage）
  //   // filter: mutation => true, // 自定义过滤函数，用于决定是否要持久化特定的 mutation（可选，默认为全部持久化）
  //   // subscriber: subscriber => subscriber(subscribeAction), // 自定义订阅函数，用于订阅变更，可以在此回调中触发外部逻辑（可选，默认为订阅 mutation）
  //   // 更多配置项...
  // })]
