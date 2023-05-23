<template>
  <div class="swiper-container" id="floor1Swiper">
    <div class="swiper-wrapper">
      <!-- 轮播图 -->
      <div class="swiper-slide" v-for="li in list" :key="li.id">
        <img :src="li.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "AllCarousel",
  props: ["list"],
  watch: {
    list: {
      immediate: true,
      handler(oldvalue, newvalue) {
        this.$nextTick(() => {
          // 创建swiper实例
          var mySwiper = new Swiper(".swiper-container", {
            // direction: "vertical", // 垂直切换选项
            loop: true, // 循环模式选项
            autoplay: {
              autoplay: true,
              delay: 2000,
            },
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              //   点击小球切换图片
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },

            // 如果需要滚动条
            scrollbar: {
              el: ".swiper-scrollbar",
            },
          });
        });
      },
    },
  },
};
</script>

<style></style>