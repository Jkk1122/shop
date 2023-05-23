<template>
  <div class="type-nav">
    <div class="container">
        <!-- 事件委派 -->
        <div @mouseleave="leaveIndex" @mouseenter="enterShow">
            <h2 class="all">全部商品分类</h2>
            <!-- 添加过渡动画 -->
            <transition name="sort">
                <div class="sort" v-show="show">
                <!-- 事件委派 -->
                <div class="all-sort-list2" @click="goSearch">

                    <div class="item" v-for="(c1,index) in cateList" :key="c1.categoryId">
                        <h3 @mouseenter="enterIndex(index)" :class="{cur:currentIndex==index}">
                            <a href="javascript:;" :data-categoryname="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                        </h3>
                        <div class="item-list clearfix" :style="{display:currentIndex==index ? 'block':'none'}">
                            <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                <dl class="fore">
                                    <dt>
                                        <a :data-categoryname="c2.categoryName" href="javascript:;" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                                    </dt>
                                    <dd>
                                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                            <a href="javascript:;" :data-categoryname="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                        </em>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </transition>
        </div>
        <nav class="nav">
            <a href="###">服装城</a>
            <a href="###">美妆馆</a>
            <a href="###">尚品汇超市</a>
            <a href="###">全球购</a>
            <a href="###">闪购</a>
            <a href="###">团购</a>
            <a href="###">有趣</a>
            <a href="###">秒杀</a>
        </nav>
    </div>
  </div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        name:'TypeNav',
        data(){
            return{
                currentIndex:-1,
                show:true
            }
        },
        methods:{
            // 三段背景色
            enterIndex(index){
                this.currentIndex = index
            },
            leaveIndex(){
                this.currentIndex = -1
                // 判断 如果路由组件为search时则不显示三段
                if(this.$route.name =='search'|| 'detail' ){
                    this.show = false
                    // console.log(555);
                }
            },
            enterShow(){
                this.show = true
            },
            //路由跳转
            goSearch(event){
                // this.$router.push('/search')
                // 获取点击的节点
                console.log(event.target);

                // dataset获取自定义属性
                // 解构赋值可以获取点击标签信息
                let {categoryname,category1id,category2id,category3id} = event.target.dataset;
                // 判断点击的是否为a标签
                if(categoryname){
                    // 整理参数
                    let location = {name:'search'}
                    // query参数
                    let query = {categoryName:categoryname}
                    if(category1id){
                        query.category1id = category1id
                    }else if(category2id){
                        query.category2id = category2id
                    }else if(category3id){
                        query.category3id = category3id
                    }
                    // 整合参数，将location参数和query整合
                    location.query = query
                    console.log(this.$route);
                    
                    if(this.$route.params){
                        //在search路由中会传递搜索的参数
                        location.params = this.$route.params

                    }
                    // 编程式路由导航push
                    this.$router.push(location)
                }
            } 

        },  
        // 组件挂载完毕,请求数据
        mounted(){
            // 初始挂载时，将search的show值改为false
            if(this.$route.name == 'search' || 'detail'){
                this.show = false
            }

        },
        computed:{
            ...mapState('home',['cateList'])
        }
    }
</script>

<style lang="less">
    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                                text-decoration: none;
                            }
                        }

                        .item-list {
                            // display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        // &:hover {
                        //     .item-list {
                        //         display: block;
                        //     }
                        // }
                    }
                    .cur{
                        background-color: skyblue;
                    }
                }
            }
            //过渡动画进入
            .sort-enter{
                opacity: 0;
                height: 0px;
            }
            //最后的效果
            .sort-enter-to{
                opacity: 1;
                height: 461px;
            }
            // 过渡动画的过程
            .sort-enter-active{
                transition: all 0.45s linear;
            }
        }
    }
</style>