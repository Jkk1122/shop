// 引入路由插件
import MyHome from '../pages/MyHome'
import MySearch from '../pages/MySearch'
import MyDetail from '../pages/MyDetail'
import AddCartSuccess from '../pages/AddCartSuccess'
import ShopCart from '../pages/ShopCart'
import Login from '../pages/Login'
import Register from '../pages/Register'

import Trade from '../pages/Trade'
import Pay from '../pages/Pay'
import PaySuccess from '../pages/PaySuccess'
import Center from '../pages/Center'

import myOrder from '../pages/Center/myOrder'
import groupOrder from '../pages/Center/groupOrder'

export default [
    {
        // 个人中心组件
        path:'/center',
        component:Center,
        // 二级路由
        children:[
            {
                path:'myorder',
                component:myOrder
            },
            {
                path:'grouporder',
                component:groupOrder
            },
            {
                // 重定向
                path:'/center',
                redirect:'/center/myorder'
            }

        ]
    },
    {
        // paysuccess组件
        path:'/paysuccess',
        component:PaySuccess,
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            if(from.path == '/pay'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        // pay组件
        path:'/pay',
        component:Pay,
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            if(from.path == '/trade'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        // trade组件
        path:'/trade',
        component:Trade,
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            if(from.path == '/shopcart'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        // Login组件
        name:'login',
        path:'/login',
        component:Login
    },
    {
        // Register组件
        path:'/register',
        component:Register
    },
    {
        // shopcart组件
        path:'/shopcart',
        component:ShopCart
    },
    {
        // AddCartSuccess组件
        name:'addcartsuccess',
        path:'/addcartsuccess',
        component:AddCartSuccess
    },
    {
        // detail组件
        name:'detail',
        path:'/detail/:skuId',
        component:MyDetail,
    },
    {
        path:'/home',
        component:MyHome
    },
    {
        name:'search',
        path:'/search/:keyword?',
        component:MySearch
    },
    // 重定向，定向到home页面首页
    {
        path:'*',
        redirect:'/home'
    }
]