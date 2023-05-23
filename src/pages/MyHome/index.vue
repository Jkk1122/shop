<template>
  <div>
    <!-- <h1>我是首页</h1> -->
    <TypeNav />
    <ListContainer />
    <TodayRecommend />
    <ShopRank />
    <ShopLike />
    <ShopFloor v-for="(floor) in floorList" :key="floor.id" :floorlist="floor"/>
    <ShopBrand />
  </div>
</template>

<script>
import ListContainer from "./ListContainer";
import TodayRecommend from "./TodayRecommend";
import ShopRank from "./ShopRank";
import ShopLike from "./ShopLike";
import ShopFloor from "./ShopFloor";
import ShopBrand from "./ShopBrand";

import { mapState } from "vuex";

export default {
  name: "MyHome",
  mounted() {
    // 派发请求,获取floor组件
    this.$store.dispatch("home/getFloorList");
    // 派发请求获取用户信息
    // this.$store.dispatch('getUserInfo')
  },
  computed: {
    ...mapState({
      floorList: function (state) {
        return state.home.floorList;
      },
    }),
  },
  components: {
    ListContainer,
    TodayRecommend,
    ShopRank,
    ShopLike,
    ShopFloor,
    ShopBrand,
  },
};
</script>

<style>
</style>