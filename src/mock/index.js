import Mock from 'mockjs'

// 使用mockjs模拟数据

let tableData = []
let orderData = []
let orderData1 = []
let zhuzhuangtu = {
    title: {
        text: '用户统计',
    },
    legend: {
        textStyle: {
            color: '#333'
        }
    },
    grid: {
        left: '20%',

    },
    tooltip: {
        trigger: 'axis',
    },
    xAxis: {
        type: 'category',
        // data:[],
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        axisLabel: {
            lineStyle: {
                color: '#17b3a3'
            }
        },
        axisLine: {
            interval: 0,
            color: "#333"
        },

    },
    yAxis: [
        {
            type: 'value',
            axisLabel: {
                lineStyle: {
                    color: '#17b3a3'
                },
            },
        }
    ],
    series: [
        {
            name: '新增用户',
            type: 'bar',
            data: [5, 10, 12, 60, 65, 53, 53],
        },
        {
            name: '活跃用户',
            type: 'bar',
            data: [200, 500, 550, 800, 550, 770, 170],
        },

    ],
    color: ['#2ec7c9', '#b6a2de']
}
for (let a = 1; a < 20; a++) {
    tableData.push({
        date: Mock.Random.datetime("yyyy-MM-dd"),
        name: Mock.Random.cname(),
        address: Mock.Random.city(),
    })
}

for (let a = 1; a < 7; a++) {
    orderData.push({
        name: "今日支付订单",
        value: Math.ceil(Math.random() * 10000 - 1),
        icon: "success",
        color: Mock.Random.color(),
    })
}
for (let a = 1; a < 8; a++) {
    orderData1.push({
        oppo: Math.ceil(Math.random() * 10000 - 1),
        vivo: Math.ceil(Math.random() * 10000 - 1),
        三星: Math.ceil(Math.random() * 10000 - 1),
        小米: Math.ceil(Math.random() * 10000 - 1),
        苹果: Math.ceil(Math.random() * 10000 - 1),
        魅族: Math.ceil(Math.random() * 10000 - 1),

    })
}
// 获取首页table数据
Mock.mock('/api/home/tableData', () => {
    return Mock.mock({
        code: 200,
        message: '请求成功',
        data: tableData
    })
})
// 获取首页order数据
Mock.mock('/api/home/orderData', () => {
    return Mock.mock({
        code: 200,
        message: '请求成功',
        data: orderData
    })
})
// 获取折线图数据
Mock.mock('/api/home/getLineChartData', () => {
    return Mock.mock({
        code: 200,
        message: '请求成功',
        data: orderData1
    })
})
// 获取柱状图数据
Mock.mock('/api/home/zhuzhuangtu', () => {
    return Mock.mock({
        code: 200,
        message: '请求成功',
        data: zhuzhuangtu
    })
})



let mallData = []
for (let a = 1; a < 150; a++) {
    mallData.push({
        // date1:  new Date(+new Date('2000') + Math.random() * (new Date('2023') - new Date('2000'))).toISOString().split('T')[0],
        date1: function getRandomDate() {
            const startDate = new Date('2023-01-01');
            const endDate = new Date('2023-12-31');

            const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
            const randomDate = new Date(randomTime);

            const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            const dayOfWeek = daysOfWeek[randomDate.getDay()];
            const monthName = months[randomDate.getMonth()];
            const day = randomDate.getDate();
            const year = randomDate.getFullYear();

            return `${dayOfWeek} ${monthName} ${day} ${year} 00:00:00 GMT+0800 (中国标准时间)`;
        }
        ,
        name: Mock.Random.cname(),
        address: Mock.Random.city(),
        age: Math.ceil(Math.random() * 50 - 1),
        gender: Math.ceil(Math.random() * 2 - 1),
        id: crypto.randomUUID(),
    })
}


// 新增商城table数据
Mock.mock('/api/mall/add', "post", (data) => {
    // 判断是否有id，有id就是修改，没有就是新增
    let ids = JSON.parse(data.body).id
    console.log(ids)
    if (ids) {
        // 有id就是修改
        mallData.forEach((item, index) => {
            if (item.id == ids) {
                mallData[index] = JSON.parse(data.body)
            }
        })
        return Mock.mock({
            code: 200,
            message: '修改成功',
        })
    } else {
        // 没有id就是新增
        mallData.unshift({
            ...JSON.parse(data.body),
            id: crypto.randomUUID()
        })
        return Mock.mock({
            code: 200,
            message: '添加成功',
        })
    }

})
// 获取商城table数据
Mock.mock('/api/user/tableData', "post", (data) => {
    // 分页获取数据
    // console.log(data)
    let { page, limit } = JSON.parse(data.body)
    // console.log(page,limit)
    let start = (page - 1) * limit
    let end = page * limit
    let total = mallData.length
    let arr = mallData.slice(start, end)
    // 通过name在mallData中查找数据
    let searchName = JSON.parse(data.body).searchName
    if (searchName) {
        arr = mallData.filter((item, index) => {
            return item.name.indexOf(searchName) != -1
        })
        total = arr.length
        arr = arr.slice(start, end)
        return Mock.mock({
            code: 200,
            message: '请求成功',
            data: {
                arr,
                total
            },
        })
    }
    return Mock.mock({
        code: 200,
        message: '请求成功',
        data: {
            arr,
            total
        },
    })
})
// 删除商城table数据
Mock.mock('/api/user/deleteTableData', "post", (data) => {
    let ids = Object.values(JSON.parse(data.body))// 把ids对象转化成数组
    // 用foreach循环删除mallData中的数据
    ids.forEach((item, index) => {
        mallData.forEach((item1, index1) => {
            if (item === item1.id) {
                mallData.splice(index1, 1)
            }
        })
    })

    return Mock.mock({
        code: 200,
        message: '删除成功',
        data: mallData
    })
})

// 生成token
Mock.mock('/api/login', "post", (data) => {
    let { username, password } = JSON.parse(data.body)
    if (username == "admin" && password == "admin") {
        return Mock.mock({
            code: 200,
            message: '登录成功',
            data: {
                userInfo:{
                    permissions:['SuperAdmin','GeneralAdmin'],
                    username:'admin',
                    password:'admin',
                    name:'SuperAdmin',
                    identity:'超级管理员',
                    LastLandingSite:'天津市',
                    LastLandingTime:'2023-08-01 12:00:00',
                },
                token: crypto.randomUUID(),
                menuData: [ // 子路由
                {
                  path: 'home',
                  name: 'home',
                  icon: "s-home",
                  redirect: '/home/echart1', // 重定向
                  meta: {
                    title: '首页',
                    requireAuth: true
          
                  },
                  component: '/Home/index.vue',
                  children: [
                    {
                      path: 'echart1',
                      name: 'echart1',
                      meta: {
                        title: '图表1',
                        requireAuth: true
          
                      },
                      component: '/Home/compoents/echart1.vue',
                    },
                    {
                      path: 'echart2',
                      name: 'echart2',
                      meta: {
                        title: '图表2',
                        requireAuth: true
          
                      },
                      component: '/Home/compoents/echart2.vue',
                    },
                    {
                      path: 'echart3',
                      name: 'echart3',
                      meta: {
                        title: '图表3',
                        requireAuth: true
          
                      },
                      component: '/Home/compoents/echart3.vue',
                    }
                  ]
          
          
          
                },
                {
                  path: 'user',
                  name: 'user',
                  icon: "user",
                  meta: {
                    title: '用户',
                    requireAuth: true
          
                  },
                  component: '/User/index.vue'
                },
                {
                  path: 'mall',
                  name: 'mall',
                  icon: "video-play",
                  meta: {
                    title: '商城',
                    requireAuth: true
          
                  },
                  component: '/Mall/index.vue'
                },
                {
                  path: 'page1',
                  name: 'page1',
                  icon: "setting",
                  meta: {
                    title: '其他1',
                    requireAuth: true,
                  },
                  component: '/Other/otherOne.vue'
                },
                {
                  path: 'page2',
                  name: 'page2',
                  icon: "setting",
                  meta: {
                    title: '其他2',
                    requireAuth: true,
                  },
                  component: '/Other/otherTwo.vue'
                },
                
          
              ]

            }
        })
    } else if (username == "admin1" && password == "admin1") {
        return Mock.mock({
            code: 200,
            message: '登录成功',
            data: {
                userInfo:{
                    permissions:['GeneralAdmin'],
                    username:'admin1',
                    password:'admin1',
                    name:'GeneralAdmin',
                    identity:'普通管理员',
                    LastLandingSite:'北京市',
                    LastLandingTime:'2021-08-01 12:00:00',
                },
                token: crypto.randomUUID(),
                menuData: [ // 子路由
                {
                  path: 'home',
                  name: 'home',
                  redirect: '/home/echart1', // 重定向
                icon: "s-home",

                  meta: {
                    title: '首页',
                    requireAuth: true
          
                  },
                  component: '/Home/index.vue',
                  children: [
                    {
                      path: 'echart1',
                      name: 'echart1',
                      meta: {
                        title: '图表1',
                        requireAuth: true
          
                      },
                      component: '/Home/compoents/echart1.vue',
                    },
                    {
                      path: 'echart2',
                      name: 'echart2',
                      meta: {
                        title: '图表2',
                        requireAuth: true
          
                      },
                      component: '/Home/compoents/echart2.vue',
                    },
                    {
                      path: 'echart3',
                      name: 'echart3',
                      meta: {
                        title: '图表3',
                        requireAuth: true
          
                      },
                      component: '/Home/compoents/echart3.vue',
                    }
                  ]
          
          
          
                },
                {
                    path: 'user',
                    name: 'user',
                    icon: "user",
                    meta: {
                      title: '用户',
                      requireAuth: true
            
                    },
                    component: '/User/index.vue'
                  },
                {
                  path: 'mall',
                  name: 'mall',
                  icon: "video-play",
                  meta: {
                    title: '商城',
                    requireAuth: true
          
                  },
                  component: '/Mall/index.vue'
                },
                // {
                //     path: '*',
                //     name: '404',
                //     redirect: '/home/echart1',
                //     meta: {
                //         title: '重定向',
                //     },
                // }
               
              ]

            }
        })
    } else {
        return Mock.mock({
            code: 400,
            message: '用户名或密码错误',
            data: null
        })
    }
})
// // 生成token
// Mock.mock('/api/login',"post",  (data) => {
//     let {username,password} = JSON.parse(data.body)
//     if(username == "admin" && password == "admin"){
//         return Mock.mock({
//             code: 200,
//             message: '登录成功',
//             data: {
//                 token:crypto.randomUUID(),
//                 menuData:[ // 左侧菜单数据

//         {
//             path: '/home',
//             name:'home',
//             label: '首页',
//             icon: 's-home',
//             url: 'Home',
//             meta:{
//                 title:'首頁1',
//                 requireAuth: true
//               },
//         },
//         {
//             path: '/mall',
//             name:'mall',
//             label: '商品管理',
//             icon: 'video-play',
//             url: 'Mall',
//             meta:{
//                 title:'商城',
//                 requireAuth: true
//               },
//         },
//         {
//             path: '/user',
//             name:'user',
//             label: '用戶管理',
//             icon: 'user',
//             url: 'User',
//             meta:{
//                 title:'用戶',
//                 requireAuth: true
//               },
//         },
//         {
//             label: '其他',
//             icon: 'location',
//             children: [
//                 {
//                     path: '/page1',
//                     name:'page1',
//                     label: '其他1',
//                     icon: 'setting',
//                     url: 'PageOne',
//                     meta:{
//                         title:'其他1',
//                         requireAuth: true
//                       },
//                 },
//                 {
//                     path: '/page2',
//                     name:'page2',
//                     label: '其他2',
//                     icon: 'setting',
//                     url: 'PageTwo',
//                     meta:{
//                         title:'其他2',
//                         requireAuth: true
//                       },
//                 },
//             ]
//         },
//       ]
//             }
//         })
//     }else if(username == "admin1" && password == "admin1"){
//         return Mock.mock({
//             code: 200,
//             message: '登录成功',
//             data: {
//                 token:crypto.randomUUID(),
//                 menuData:[ // 左侧菜单数据

//         {
//             path: '/home',
//             name:'home',
//             label: '首页',
//             icon: 's-home',
//             url: 'Home',
//             meta:{
//                 title:'首頁',
//                 requireAuth: true
//               },
//         },
//         {
//             path: '/mall',
//             name:'mall',
//             label: '商品管理',
//             icon: 'video-play',
//             url: 'Mall',
//             meta:{
//                 title:'商城',
//                 requireAuth: true
//               },
//         },
//       ]
//             }
//         })
//     } else{
//         return Mock.mock({
//             code: 400,
//             message: '用户名或密码错误',
//             data: null
//         })
//     }
// })