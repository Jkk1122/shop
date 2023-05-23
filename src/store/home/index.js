// home小仓库
import { reqFloorList } from '@/api';
import { reqCategoryList,reqBannerList } from '/src/api'

const state = {
    cateList:[],
    // 轮播图数据
    bannerList:[],
    // floor数据
    floorList:[]
};
const mutations ={
    CATEGORYLIST(state,data){
        state.cateList = data
    },
    BANNERLIST(state,data){
        state.bannerList = data
    },
    FLOORLIST(state,data){
        state.floorList = data
    }

};
const actions = {
    // 获取三级联动列表数据
    async getlist(context){
        let result =await reqCategoryList();
        console.log(result);
        if(result.code === 200){
            context.commit("CATEGORYLIST",result.data)
        }
    },
    // 获取首页轮播图
    async getBannerList(context){
        let result = await reqBannerList();
        // console.log(result);
        if(result.code == 200){
            context.commit("BANNERLIST",result.data)
        }
        console.log(result.data);
    },
    async getFloorList(context){
        let result = await reqFloorList()
        console.log(result);
        if(result.code == 200){
            context.commit('FLOORLIST',result.data)
        }
    }
};
const getter = {};

// 暴露
export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getter,
}