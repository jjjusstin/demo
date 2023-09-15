import request from './request'
// 获取用户表格数据
export function login(data) {
    return request({
        url: '/login',
        method: 'post',
        data
    })
}
