<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <!-- 购物车 商品信息 -->
        <ul class="cart-list" v-for="(cart) in cartList.cartInfoList" :key="cart.skuId">
          <li class="cart-list-con1">
            <!-- 多选框 -->
            <input type="checkbox" name="chk_list" :checked="cart.isChecked" @change="changeChecked(cart, $event)">
          </li>
          <li class="cart-list-con2">
            <!-- 图片 信息 -->
            <img :src="cart.imgUrl">
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <!-- 价格 -->
            <span class="price">{{ cart.skuPrice }}.00</span>
          </li>
          <!-- 数量 -->
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handle('minus', -1, cart)">-</a>
            <input autocomplete="off" type="text" minnum="1" class="itxt" :value="cart.skuNum * 1"
              @change="handle('change', $event.target.value, cart)">
            <a href="javascript:void(0)" class="plus" @click="handle('add', 1, cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <!-- 单个商品的合计价格 -->
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:;" class="sindelet" @click="shopCartDelete(cart.skuId)">删除</a>
            <br>
            <a href="javascript:;">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllCheck" @change="changeAllChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入nanoid
import { nanoid } from 'nanoid'
// 引入mapGetters
import { mapGetters } from 'vuex'
export default {
  name: 'ShopCart',
  data() {
    return {

    }
  },
  mounted() {
    // 请求数据
    this.getData()
    console.log(nanoid());
  },
  methods: {
    // 封装请求购物车数据函数
    getData() {
      this.$store.dispatch('getShopCartList')
    },
    // 修改全选中状态
    async changeAllChecked(event){
      try {
        let Checked = event.target.checked ? "1" : "0";
        await this.$store.dispatch('getChangeAllChecked',Checked)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 修改商品选中状态
    async changeChecked(cart,event){
      // 
      try {
        let isChecked = event.target.checked ? "1" : "0";
        await this.$store.dispatch('getChangeChecked',{skuId:cart.skuId,isChecked:isChecked})
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    //点击处理数量
    // 传递参数，type传递的是加减类型
    // disNum传递的是目前的值   在函数里面对disNum的值进行选择判断  1 负1  0 或者为输入值减原来的值
    // cart传递原来的小计数值
    async handle(type, disNum, cart) {
      // switch case 进行判断 
      switch (type) {
        // 如果为add 那么disNum则为 加1
        case "add":
          disNum = 1;
          break;
        // 如果为minus 那么disNum则为 负1
        case 'minus':
          // 先对原先的值进行判断，小于1就不进行减一操作，那么disNum的值为0
          disNum = cart.skuNum > 1 ? -1 : 0;
          break;
        // 如果为change
        case 'change':
          // 判断非法和小于0
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            // 非整数可以进行取整操作
            disNum = parseInt(disNum) - cart.skuNum

          }
          break;
      }
      //派发actions
      try {
        await this.$store.dispatch('getUpdateShopCar', { skuId: cart.skuId, skuNum: disNum })
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 删除购物车数据
    async shopCartDelete(skuId) {
      // 派发请求
      try {
        await this.$store.dispatch('getDeleteCart', skuId)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 删除全部选择的商品数据
    async deleteAllChecked(){
      try {
        
        await this.$store.dispatch('getAllChecked')
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    }
  },
  computed: {
    // 捞取getters简化后的数据
    ...mapGetters(['cartList','cartInfoList']),
    // 合计
    totalPrice() {
      if(this.cartList.cartInfoList){
        let sum = 0
        this.cartList.cartInfoList.forEach(item => {
          sum += item.skuNum * item.skuPrice
          console.log(sum);
        }); 
        return sum;
      }
      
    },
    // 处理全选事件
    isAllCheck() {
      if(this.cartList.cartInfoList){
        return this.cartList.cartInfoList.every(item => {
          return item.isChecked == 1 
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
.cart {
  width: 75rem;
  margin: 0 auto;

  h4 {
    margin: .5625rem 0;
    font-size: .875rem;
    line-height: 1.3125rem;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: .0625rem solid #ddd;
      padding: .625rem;
      overflow: hidden;

      &>div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;

      }
    }

    .cart-body {
      margin: .9375rem 0;
      border: .0625rem solid #ddd;

      .cart-list {
        padding: .625rem;
        border-bottom: .0625rem solid #ddd;
        overflow: hidden;

        &>li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 5.125rem;
            height: 5.125rem;
            float: left;
          }

          .item-msg {
            float: left;
            width: 9.375rem;
            margin: 0 .625rem;
            line-height: 1.125rem;
          }
        }


        .item-txt {
          text-align: center;
        }
      }

      .cart-list-con4 {
        width: 10%;

      }

      .cart-list-con5 {
        width: 16%;

        .mins {
          border: .0625rem solid #ddd;
          border-right: 0;
          float: left;
          color: #666;
          width: .375rem;
          text-align: center;
          padding: .5rem;
        }

        input {
          border: .0625rem solid #ddd;
          width: 2.5rem;
          height: 2.0625rem;
          float: left;
          text-align: center;
          font-size: .875rem;
        }

        .plus {
          border: .0625rem solid #ddd;
          border-left: 0;
          float: left;
          color: #666;
          width: .375rem;
          text-align: center;
          padding: .5rem;
        }
      }

      .cart-list-con6 {
        width: 12%;

        .sum {
          font-size: 1rem;
        }
      }

      .cart-list-con7 {
        width: 10%;

        a {
          color: #666;
        }
      }
    }
  }
}

.cart-tool {
  overflow: hidden;
  border: .0625rem solid #ddd;

  .select-all {
    padding: .625rem;
    overflow: hidden;
    float: left;

    span {
      vertical-align: middle;
    }

    input {
      vertical-align: middle;
    }
  }

  .option {
    padding: .625rem;
    overflow: hidden;
    float: left;

    a {
      float: left;
      padding: 0 .625rem;
      color: #666;
    }
  }

  .money-box {
    float: right;

    .chosed {
      line-height: 1.625rem;
      float: left;
      padding: 0 .625rem;
    }

    .sumprice {
      width: 12.5rem;
      line-height: 1.375rem;
      float: left;
      padding: 0 .625rem;

      .summoney {
        color: #c81623;
        font-size: 1rem;
      }
    }

    .sumbtn {
      float: right;

      a {
        display: block;
        position: relative;
        width: 6rem;
        height: 3.25rem;
        line-height: 3.25rem;
        color: #fff;
        text-align: center;
        font-size: 1.125rem;
        font-family: "Microsoft YaHei";
        background: #e1251b;
        overflow: hidden;
      }
    }
  }
}
</style>