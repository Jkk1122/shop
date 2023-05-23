import { reqDetailInfo, reqUpdateShopCar } from "@/api";
import {getNanoid} from '@/utils/nanoid_token'

// vuex 商品详情的数据存储
const state = {
    detaillist:{},
    // 游客临时身份
    nanoid_token: getNanoid()
}
const mutations ={
    GETDETAILINFO(state,data){
        state.detaillist = data 
    }
}
const actions ={
    // 数据详情处理
    async getDetailInfo(context,skuId){
        let result = await reqDetailInfo(skuId)
        if(result.code == 200){
            context.commit('GETDETAILINFO',result.data)
        }
    },
    async getUpdateShopCar(context,{skuId,skuNum}){
        let result = await reqUpdateShopCar(skuId,skuNum)
        // 如果发送成功，那么就返回ok
        if(result.code == 200 ){
            return 'ok'
            
        }else{
            // 如果失败那么就返回失败的promise
            return Promise.reject(new Error('fail'));
        }
        
    }    
}
// 处理简化数据
const getters ={
    categoryView(state){
        return state.detaillist.categoryView || {}
    },
    
    skuInfo(state){
        return state.detaillist.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.detaillist.spuSaleAttrList || []
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}