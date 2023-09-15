import request from './request'
// 获取用户表格数据
export function getTableData(data) {
    return request({
        url: '/user/tableData',
        method: 'post',
        data
    })
}//删除用户表格数据
export function deleteTableData(data) {
    return request({
        url: '/user/deleteTableData',
        method: 'post',
        data
    })
}
//添加用户表格数据
export function addTableData(data) {
    return request({
        url: '/mall/add',
        method: 'post',
        data
    })
}