// 生成nanoid
// 引入nanoid
import { nanoid } from 'nanoid'
// 设置对外暴露的函数getNanoid()
export const getNanoid = ()=>{
    // 现从localstorage中读取.看是否存在NANIODTOKEN的值
    let  nanoid_token = localStorage.getItem('NANOIDTOKEN');
    // 如果值不存在
    if(!nanoid_token){
        // 获取该值
        nanoid_token = nanoid()
        // 将该值存入localstorage
        localStorage.setItem('NANOIDTOKEN',nanoid_token)
    }
    // 返回生成的nanoid_token
    return nanoid_token
}