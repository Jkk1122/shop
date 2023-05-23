import {reqLogin, reqTradeList, reqUserInfo, reqUserLoginOut} from '@/api'
import { setToken,getToken, removeToken } from '@/utils/token'
const state = {
    // 服务器返回信息token
    token:getToken(),
    userinfo:{},
    // 交易页信息
    tradeList:{}
}
const mutations = {
    // 存储token
    GETLOGIN(state,token){
        state.token = token
    },
    // 存储用户信息数据
    GETUSERINFO(state,data){
        state.userinfo = data
    },
    // 清除数据
    CLEARDATA(state){
        state.token = '',
        state.userinfo = {},
        removeToken()
    },
    // 交易页信息数据
    GETTRADELIST(state,data){
        state.tradeList = data
    }
}
const actions = {
    // 派发登录请求
    async getLogin(context,data){
        let result = await reqLogin(data)
        console.log(result);
        if(result.code == 200){
            // console.log(result);
            context.commit('GETLOGIN',result.data.token)
            setToken(result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error(result.message))
        }
    },
    // 获取用户信息
    async getUserInfo(context){
        let result =await reqUserInfo()
        console.log(result);
        if(result.code == 200){
            context.commit('GETUSERINFO',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('jijijijij'))
        }
    },
    // 退出登录
    async getUserLoginOut(context){
        let result =await reqUserLoginOut()
        if(result.code == 200){
            context.commit('CLEARDATA')
            return 'ok'
        }else{
            return Promise.reject(new Error('huaila'))
        }
    },
    // 获取交易页信息
    async getTradeList(context){
        let result =await reqTradeList()
        if(result.code == 200){
            console.log(result);
            context.commit('GETTRADELIST',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('jijibao'))
        }
    }
}
//简化数据
const getters = {
    //用户地址信息
    userAddressList(){
        return state.tradeList.userAddressList || {}
    },
    // 交易页商品信息
    detailArrayList(){
        return state.tradeList.detailArrayList || {}
    },
    // 总金额
    totalAmount(){
        return state.tradeList.totalAmount || ''
    },
    // 总数
    totalNum(){
        return state.tradeList.totalNum || ''
    },
    // 订单号
    tradeNo(){
        return state.tradeList.tradeNo || ''
    }
}
export default {
    state,
    actions,
    mutations,
    getters
}