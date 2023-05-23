<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
        <div class="container">
            <div class="loginList">
                <p>尚品汇欢迎您！</p>
                <p v-if="!userName">
                    <span>请</span>
                    <router-link to="/login" >登录</router-link>
                    <router-link to="/register" class="register">免费注册</router-link>
                </p>
                <p v-else>
                    <a>{{userName}}</a>
                    <a class="register" @click="UserLoginOut">退出登录</a>
                </p>
            </div>
            <div class="typeList">
                <router-link to="/center">我的订单</router-link>
                <router-link to="/shopcart">我的购物车</router-link>
                <a href="###">我的尚品汇</a>
                <a href="###">尚品汇会员</a>
                <a href="###">企业采购</a>
                <a href="###">关注尚品汇</a>
                <a href="###">合作招商</a>
                <a href="###">商家后台</a>
            </div>
        </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
        <h1 class="logoArea">
            <router-link class="logo" to="/home" >
                <img src="./images/logo.png" alt="">
            </router-link>
        </h1>
        <div class="searchArea">
            <form action="###" class="searchForm">
                <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword"/>
                <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
            </form>
        </div>
    </div>
  </header>
</template>

<script>
    export default {
        name:'ShopHeader',
        data(){
            return{
                keyword:''
            }
        },
        computed:{
            userName(){
                return this.$store.state.login.userinfo.name
            }
        },
        methods:{
            // 搜索函数，点击跳转路由
            goSearch(){
                // console.log(this.$route);
                let location = {name:'search'}
                let params = {keyword:this.keyword || undefined}
                let query = this.$route.query
                location.params = params
                location.query = query
                this.$router.push(location)        
        
            },
            // 退出登录
            async UserLoginOut(){
                try {
                    await this.$store.dispatch('getUserLoginOut')
                    // 退出成功返回首页
                    this.$router.push('/home')
                } catch (error) {
                    alert(error.message)
                }
            }
        },
        mounted(){
            // 全局事件总线，将keyword置空
            this.$bus.$on("clear",()=>{
                this.keyword = ''
            })
        }
        }
</script>

<style lang="less" scoped>
  .header{
        &>.top{
            background-color: #eaeaea;
            height: 1.875rem;
            line-height: 1.875rem;
            .container{
                width: 75rem;
                margin: 0 auto;
                overflow: hidden;
                .loginList{
                    float: left;
                    p{
                        float: left;
                        margin-right: .625rem;
                        .register{
                            border-left: .0625rem solid #b3aeae;
                            padding: 0 .3125rem;
                            margin-left: .3125rem;
                        }
                    }
                } 
                .typeList{
                    float: right;
                    a{
                        padding: 0 .625rem;
                        & + a{
                            border-left: .0625rem solid #b3aeae;
                        }
                    }
                    
                }
                
            }
        }
        &>.bottom{
            width: 75rem;
            margin: 0 auto;
            overflow: hidden;
            .logoArea{
                float: left;
                .logo{
                    img{
                        width: 10.9375rem;
                        margin: 1.5625rem 2.8125rem;
                    }
                }
            }
            .searchArea{
                float: right;
                margin-top: 2.1875rem;
                .searchForm{
                    overflow: hidden;
                    input{
                        box-sizing: border-box;
                        width: 30.625rem;
                        height: 2rem;
                        padding: 0rem .25rem;
                        border: .125rem solid #ea4a36;
                        float: left;
                        &:focus{
                            outline: none;
                        }
                    }
                    button{
                        height: 2rem;
                        width: 4.25rem;
                        background-color: #ea4a36;
                        border: none;
                        color: #fff;
                        float: left;
                        cursor: pointer;
                        &:focus{
                            outline: none;
                        }
                    }
                }
            }
        }
    }
</style>