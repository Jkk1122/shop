// 对axios进行二次封装

// 先引用axios
import axios from "axios"
// 引入进度条
import nprogress from 'nprogress'
// start 开始 done 结束
// 引入进度条样式
import "nprogress/nprogress.css"

// 利用axios方法create创建一个axios实例
const requests = axios.create({
    // 配置对象
    // 基础路径，发送请求的时候，路径当中会出现api
    baseURL:'/mock',
    // 请求超时时间
    timeout:5000,
});

// 请求拦截器
requests.interceptors.request.use((config)=>{
    // config配置对象  对象里面有一个属性很重要，header请求头
    nprogress.start();
    return config;
});

// 响应请求头
requests.interceptors.response.use(
    (response)=>{
        nprogress.done();
        return response.data
    },(error)=>{
        return Promise.reject(new Error('why error'))
    })


// 对外暴露
export default requests