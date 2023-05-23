// 对axios进行二次封装

// 先引用axios
import axios from "axios"
// 引入进度条
import nprogress from 'nprogress'
// start 开始 done 结束
// 引入进度条样式
import "nprogress/nprogress.css"
// 引入store仓库
import store from '@/store'
// 利用axios方法create创建一个axios实例
const requests = axios.create({
    // 配置对象
    // 基础路径，发送请求的时候，路径当中会出现api
    baseURL:'/api',
    // 请求超时时间
    timeout:5000,
});

// 请求拦截器
requests.interceptors.request.use((config)=>{

    // 判断数据是否由本属的nanoid
    if(store.state.detail.nanoid_token){
        // 有的话就将nanoid_token放进config.headers.userTempId
        config.headers.userTempId = store.state.detail.nanoid_token
    }
    // 把token加入请求头信息
    if(store.state.login.token){
        config.headers.token = store.state.login.token
    }
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