// API统一管理
// 引入
import requests from "./request"
import mockRequests from './mockRequest'
//三级联动接口
export const reqCategoryList = ()=>{
    return requests({
        url:'/product/getBaseCategoryList',   
        method:'GET'
    })
}
// 获取轮播图banner
export const reqBannerList = ()=>{
    return mockRequests({
        url:'/banner', 
        method:'GET'
    })
}

// 获取floor数据
export const reqFloorList = ()=>{
    return mockRequests({
        url:'/floor',
        method:'GET'
    })
}

// 获取搜索模块数据
// 给服务器传递一个parmas参数，至少是一个空对象
export const reqSearchInfo = (params)=>{
    return requests({
        url:'/list',
        method:'POST',
        data:params
    })
}
// 获取商品详情页数据
// 必须传递一个params参数
export const reqDetailInfo =(skuId)=>{
    return requests({
        url:`/item/${skuId}`,
        method:'get'
    })
}


// /api/cart/addToCart/{ skuId }/{ skuNum } 添加购物车 向服务器发送添加购物车的数据
export const reqUpdateShopCar = (skuId,skuNum)=>{
    return requests({
        url:`/cart/addToCart/${skuId}/${skuNum}`,
        method:'post'
    })
}

// /api/cart/cartList 获取购物车数据
export const  reqShopCartList = ()=>{
    return requests({
        url:'/cart/cartList',
        method:'get'
    })
}

// 删除购物车数据/api/cart/deleteCart/{skuId}   method:'delete'
export const reqDeleteCart = (skuId)=>{
    console.log(skuId,'111');
    return requests({
        url:`/cart/deleteCart/${skuId}`,
        method:'delete'
    })
}

// 改变商品的选中状态 /api/cart/checkCart/{skuID}/{isChecked}  method：get
export const reqChangeCheck = (skuId,isChecked)=>{
    return requests({
        url:`/cart/checkCart/${skuId}/${isChecked}`,
        method:'get'
    })
}

// /api/user/passport/sendCode/{phone}/api/user/passport/sendCode/{phone}
// 注册验证码api 请求方式为  get
export const  reqCodeNumber = (phone)=>{
    return requests({
        url:`/user/passport/sendCode/${phone}`,
        methods:'get'
    })
}

// 注册请求api /api/user/passport/register   method：post
export const reqRegister = (data)=>{
    return requests({
        url:'/user/passport/register',
        method:'post',
        data
    })
}
// 登录请求api /api/user/passport/login   POST   phone password 
export const reqLogin = (data)=>{
    return requests({
        url:'/user/passport/login',
        method:'post',
        data
    })
}

// 获取用户信息【需要带着用户的token向服务器要用户信息】
// url /api/user/passport/auth/getUserInfo   get请求
export const reqUserInfo=()=>{
    return requests({
        url:'/user/passport/auth/getUserInfo',
        method:'get'
    })
}
// 退出登录api
// /api/user/passport/logout  退出登录   get请求
export const reqUserLoginOut = ()=>{
    return requests({
        url:'/user/passport/logout',
        method:'get'
    })
}

// 获取交易页面信息
// /api/order/auth/trade   method：get    不带参数
export const reqTradeList = ()=>{
    return requests({
        url:'/order/auth/trade',
        method:'get'
    })
}

// 提交订单api
// /api/order/auth/submitOrder?tradeNo={tradeNo}   method：post
export const reqSubmitTrade =(tradeNo,data)=>{
    return requests({
        url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method:'post',
        data
    })
}

// 获取订单支付列表 
// /api/payment/weixin/createNative/{orderId}  method：'get'
export const reqTotalAmount = (orderId)=>{
    return requests({
        url:`/payment/weixin/createNative/${orderId}`,
        method:'get'
    })
}

// 获取支付状态
//  /api/payment/weixin/queryPayStatus/{orderId}  methods：'get'
export const reqPayStatus = (orderId)=>{
    return requests({
        url:`/payment/weixin/queryPayStatus/${orderId}`,
        method:'get'
    })
}
// 获取订单详情/api/order/auth/{page}/{limit}   get
export const reqGetOrder = (page,limit)=>{
    return requests({
        url:`/order/auth/${page}/${limit}`,
        method:'get'
    })
}