import { reqSearchInfo } from "@/api";
// search 小仓库
const state = {
    // 搜索框数据
    // 是数组还是对象由数据决定
    searchlist:{}
};
const mutations ={
    GETSEARCHLIST(state,data){
        state.searchlist = data
    }
};
const actions = {
    // 获取搜索数据
    async getSearchInfo(context,params){
        let result = await reqSearchInfo(params);
        console.log(result);
        if(result.code === 200){
            context.commit('GETSEARCHLIST',result.data)
        }
    }
};  
// 计算属性，简化数据
const getters = {
    // 简化数据，加上【||[]是为了防止在网络状况不好的时候 数据出现undefined】
    goodsList(state){
        return state.searchlist.goodsList
    },
    attrsList(state){
        return state.searchlist.attrsList
    },
    trademarkList(state){
        return state.searchlist.trademarkList
    }

};

// 暴露
export default {
    state,
    mutations,
    actions,
    getters,
}