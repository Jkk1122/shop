<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <!-- 面包屑部分 -->
          <ul class="fl sui-tag">
            <!-- 条件判断 -->
            <!-- 分类信息面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategory">×</i></li>
            <!-- 关键词面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyword">×</i></li>
            <!-- 品牌面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(':')[1]}}<i @click="removeTrademark">×</i></li>
            <!-- 显示平台售卖属性的面包屑 -->
            <li class="with-x" v-for="(attrvalue,index) in searchParams.props" :key="index">{{attrvalue.split(':')[1]}}<i @click="removeAttr(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector  @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"/>

        <!--商品-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序部分 -->
              <ul class="sui-nav">
                <!-- 综合排序 -->
                <li :class="{active:isOne}" @click="isOrder('1')">
                  <a>综合<span v-show="isOne" :class="{'iconfont':isOne,'icon-download':isDown,'icon-upload':isUp}"></span></a>
                </li>
                <!-- 价格排序 -->
                <li :class="{active:isTwo}" @click="isOrder('2')">
                  <a>价格<span v-show="isTwo" :class="{'iconfont':isTwo,'icon-download':isDown,'icon-upload':isUp}"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`" >
                      <img v-lazy="good.defaultImg"/>
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="good.title">{{
                      good.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <!-- pageNo 当前页 pageSize每页展示数量 total整个分页展示的数据 continues：代表分页连续的页码 -->
          <Pagination :pageNo="pageNo" :pageSize="pageSize" :total="total" :continues="5" @getPageno="getPageno"/>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import Pagination from "/qianduanlearn/app/src/components/Pagination"
import { mapGetters,mapState} from "vuex";
export default {
  name: "MySearch",
  data() {
    return {
      // 需要向后台服务器发送的searchParams数据
      searchParams: {
        // 一级列表
        category1id: "",
        // 二级列表
        category2id: "",
        // 三级列表
        category3id: "",
        // 分类名字
        categoryName: "",
        // 关键字
        keyword: "",
        // 排序  默认值：综合降序
        order: "1:desc",
        // 分页器的当前页数
        pageNo: undefined,
        // 每页显示个数
        pageSize:undefined,
        // 平台售卖属性操作带的参数
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },
  beforeMount(){
    // 合并参数，即将路由跳转所带参数合并到向服务器发送的searchParams参数中
    Object.assign(this.searchParams,this.$route.query,this.$route.params)
  },
  watch:{
    // 监听路由
    $route(newValue,oldValue){
      // 重置参数，确保数据之间不会影响
      this.searchParams.category1id = ''
      this.searchParams.category2id = ''
      this.searchParams.category3id = ''
      this.searchParams.keyword = ''
      //重新合并需要向后台发送的数据参数 
      Object.assign(this.searchParams,this.$route.query,this.$route.params)
      // 再次发送请求，解决mounted只能发送一次请求的问题
      this.getData()
    }
  },  
  components: {
    SearchSelector,
    Pagination
  },
  computed: {
    // 使用getters简化后的数据
    ...mapGetters(["goodsList", "attrsList", "trademarkList"]),
    isOne(){
      return this.searchParams.order.indexOf(1) != -1;
    },
    isTwo(){
      return this.searchParams.order.indexOf(2) != -1 ;
    },
    isUp(){ 
      return this.searchParams.order.indexOf('asc') != -1;
    },
    isDown(){
      return this.searchParams.order.indexOf('desc') != -1;
    },
    ...mapState({
      total:function(state){
        return state.search.searchlist.total
      },
      pageNo: state =>state.search.searchlist.pageNo,
      pageSize: state =>state.search.searchlist.pageSize,
    })

  },
  mounted() {
    // 发送请求
    this.getData();
  },
  methods: {
    // 封装vuex请求函数
    getData() {
      this.$store.dispatch("getSearchInfo", this.searchParams);
    },
    //分类标签面包屑
    removeCategory(){
      // 将分类标签名置空  实现面包屑的清空
      this.searchParams.categoryName = undefined;
      // 将发送的参数清空
      this.searchParams.category1id = undefined;
      this.searchParams.category2id = undefined;
      this.searchParams.category3id = undefined;

      // 初始化排序
      this.searchParams.order="1:desc"

      //面包屑清除之后，实现页面的全部展现，路由跳转向自己跳转：编程式路由导航
      if(this.$route.params){
        // 如果存在params参数，则需将参数保留下来
        this.$router.push({name:'search',params:this.$route.params})
      }
    },
    // 关键词面包屑
    removeKeyword(){
      // 将searchParams参数中的keyword设置为underfined
      this.searchParams.keyword = undefined;

      // 初始化排序
      this.searchParams.order="1:desc"

      // 全局事件总线将keyword的数据清除
      this.$bus.$emit('clear')
      // 跳转路由   保留query参数
      if(this.$route.query){
        this.$router.push({name:'search',query:this.$route.query})
      }
    },
    // 品牌面包屑
    removeTrademark(){
      // 将品牌面包屑置空
      this.searchParams.trademark = "";

      // 初始化排序
      this.searchParams.order="1:desc"

      // 再次发送请求
      this.getData()
    },
    // 平台售卖属性面包屑
    // 删除数组中的信息，传回index索引，确定删除数组的哪个位置数据
    removeAttr(index){
      // 点击删除面包屑时候，将这个数据从props数组中删掉
      this.searchParams.props.splice(index,1)
      
      // 初始化排序
      this.searchParams.order="1:desc"

      // 再次发送请求
      this.getData()
      
    },
    // 自定义事件:子向父传递参数
    trademarkInfo(trademark){
      console.log('我是父组件:',trademark);
      // 整理参数
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      // 再次发送请求
      this.getData()
    },
    // 自定义事件返回售卖属性数据
    attrInfo(attr,attrvalue){
      // 接收来自子组件的数据
      // 注意向服务器传输的数据格式为数组，先进行参数的处理
      let props = `${attr.attrId}:${attrvalue}:${attr.attrName}`
      // 对数据进行判断防止数组中的数据重复
      if(this.searchParams.props.indexOf(props) == -1){
        // 将数据整合在searchParams的发往服务器的参数中
        this.searchParams.props.push(props)
      }
    },
    // 判断排序函数 综合排序和价格排序
    isOrder(flag){
      console.log(flag);
      // 取出默认的flag值
      let orderFlag = this.searchParams.order.split(':')[0]
      // 取出默认的排序值
      let orderState = this.searchParams.order.split(':')[1]
      console.log(orderState);
      //创建一个新的order属性参数，存储新的变换值
      let newOrder = ''
      // 如果点击的为默认的排序
      if(flag === orderFlag){
        // 将现在的flag值和变换后的排序值存储致新的属性参数   如果原来的值为desc那么就将现在的值改为asc    保证点击后和原来的属性相反
        newOrder = `${flag}:${orderState == 'desc' ? 'asc':'desc'}`
        console.log(newOrder); 
      }else{
        // 如果变换类型（综合或价格）点击时将值初始为desc   再次点击就会变换
        newOrder = `${flag}:${orderState = 'desc'}`
        console.log(newOrder);
      }
      this.searchParams.order  = newOrder
      this.getData()
    },
    // 自定义事件  传递点击的pageNo值 当前的页面
    getPageno(pageNo){
      this.searchParams.pageNo = pageNo
      this.getData()
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>