// 二次封装axios
import axios from 'axios'

// 创建axios实例
const service = axios.create({
    baseURL: "/api", //请求地址前缀 拼接 请求地址
    timeout: 5000 // 请求超时时间
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 把token添加到请求头中
    config.headers.token = localStorage.getItem("token")
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}
    , function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    });

export default service