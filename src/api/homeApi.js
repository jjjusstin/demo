import request from './request'
// 获取首页表格数据
export function getTableData() {
    return request({
        url: '/home/tableData',
        method: 'get',
    })
}
// 获取订单数据
export function getOrderData() {
    return request({
        url: '/home/orderData',
        method: 'get',
    })
}
// 获取折线图数据
export function getLineChartData() {
    return request({
        url: '/home/getLineChartData',
        method: 'get',
    })
}
// 获取柱状图数据
export function getZhuzhuangtu() {
    return request({
        url: '/home/zhuzhuangtu',
        method: 'get',
    })
}