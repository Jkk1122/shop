import { reqDeleteCart, reqShopCartList,reqChangeCheck } from "@/api"

// 购物车数据
const state={
    // 购物车数据
    cartList:[]
}
const mutations={
    GETSHOPCARTLIST(state,data){
        state.cartList = data
    }
}
const actions={
    // 发起购物车数据请求
    async getShopCartList(context){
        let result =await reqShopCartList()
        console.log(result);
        if(result.code==200){
            context.commit('GETSHOPCARTLIST',result.data)
        }
    },
    // 删除购物车数据请求
    async getDeleteCart(context,skuId){
        let result =await reqDeleteCart(skuId)
        if(result.code==200){
            return 'ok'
        }else{
            Promise.reject(new Error('huail'))
        }
    },
    // 改变商品选中状态
    async getChangeChecked(context,{skuId,isChecked}){
        // console.log(isChecked);
        let result =await reqChangeCheck(skuId,isChecked)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }

    },
    // 删除购物车全部产品
    getAllChecked({getters,dispatch}){
        let primiseAll = []
        getters.cartList.cartInfoList.forEach(item =>{
            let primise =  item.isChecked == 1 ?  dispatch('getDeleteCart',item.skuId) : ''
            console.log(1);
            primiseAll.push(primise)
        })
        return Promise.all(primiseAll) 
    },
    // 修改商品全部选中状态
    getChangeAllChecked({getters,dispatch},Checked){
        let promiseAll = []
        if(getters.cartList.cartInfoList){
            getters.cartList.cartInfoList.forEach(item =>{
            let primise = dispatch('getChangeChecked',{skuId:item.skuId,isChecked:Checked});
            promiseAll.push(primise)
          })
        }
        return Promise.all(promiseAll)

    }
}
const getters={
    // 对购物车数据进行简化处理
    cartList(state){
        return state.cartList[0] || {}
    },
    cartInfoList(state){
        return state.cartList[0].cartInfoList || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
