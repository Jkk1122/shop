import Vue from 'vue'

import Vuex from 'vuex'

// 引入小仓库
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'

import register from './register'
import login from './login'


// 使用插件
Vue.use(Vuex)


// 对外暴露store类的一个实例
export default new Vuex.Store({
    modules:{
        home,
        search,
        detail,
        shopcart,
        register,
        login,
    }
})

