import { reqCodeNumber,reqRegister} from "@/api"

const state={
    codeNum:''
}
const mutations={
    // 处理返回的验证码信息
    GETCODENUMBER(state,data){
        state.codeNum = data
    }
}
const actions={
    // 获取验证码
    async getCodeNumber(context,phone){
        let result =await reqCodeNumber(phone)
        console.log(result);
        if(result.code == 200){
            context.commit('GETCODENUMBER',result.data)
            return 'ok'
        }else{
            return new Promise(new Error('fali'))
        }
    },
    // 注册
    async getRegister(context,data){
        let result =await reqRegister(data)
        if(result.code == 200){
            console.log(result);
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    }
}
const getters={}

export default {
    state,
    actions,
    mutations,
    getters
}