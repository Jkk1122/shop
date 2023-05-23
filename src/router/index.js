import Vue from 'vue'
// 引入路由
import VueRouter from 'vue-router'
// import VueRouter from 'vue-router'

import routes from './routes'

// 引入store模块
import store from '@/store';

// 重写push || replace方法
// 第一个参数：告诉原来的push方法，跳转到哪里（传递哪些参数）
// 第二个参数：成功的回调
// 第三个参数：失败的回调

let originpush = VueRouter.prototype.push;
let originreplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve && reject){
        // 如果有处理函数那么就使用原来的push方法
        originpush.call(this,location,resolve,reject)
    }else{
        // 如果不能确定有处理函数或者处理函数的数目不能确定那么空的回调来替代
        originpush.call(this,location,()=>{},()=>{})
    }
}

VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve && reject){
        originreplace.call(this,location,resolve,reject)
    }else{
        originreplace.call(this,location,()=>{},()=>{})
    }
}

Vue.use(VueRouter)

const router = new VueRouter({
    // 添加routes文件，储存路由组件信息，方便管理
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
      },
})
// 全局路由守卫
router.beforeEach(async (to, from, next) => {
    console.log(store);
    let token = store.state.login.token
    let name = store.state.login.userinfo.name
    //首先判断是否登录
    if(token){
    // 登录成功
    console.log(555);
        if(to.path=='/login' || to.path=='/register'){
            // 如果在登录成功后返回注册页面，不被允许
            // 将其跳转至home首页
            next('/home')
        }else{
            // 如果跳转其他页面
            // 先判断是否由name
            if(name){
            // 如果用户名存在的话
            console.log(1111);
                next()
            }else{
                // 如果用户名不存在的话进行派发actions
                try {
                    // 如果派发成功
                    await store.dispatch('getUserInfo')
                    // 就通过
                    next()
                    console.log(22222);
                } catch (error) {
                    // 如果没有派发成功，那么就是token过期等
                    // 将数据清理   类似与 【退出登录】
                    await store.dispatch('getUserLoginOut')
                    // 清理完成后，跳转到登录界面
                    next('/login')
                    console.log(333333);
                }
            }
            next()
        }
    }else{
    // 未登录   其余问题暂不处理
    // 判断  如果跳转的路由为非支付等路由文件
    // 全局路由
        let toPath = to.path
        if(toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1 ||toPath.indexOf('/paysuccess')!=-1){
            next('/login?redirect='+toPath)
        }else{
            next()
        }
    }
        
})

export default router