<template>
  <div id="app">
    <ShopHeader></ShopHeader>
    <router-view></router-view>
    <ShopFooter></ShopFooter>
  </div>
</template>

<script>
import ShopHeader from './components/ShopHeader'
import ShopFooter from './components/ShopFooter'

export default {
  name: 'App',
  components: {
    ShopHeader,
    ShopFooter
  },
  mounted(){
    //将三级联动的请求挂载放在app.vue中，可以减少组件的挂载销毁的重复，因为app组件挂载一次
    this.$store.dispatch('home/getlist');
  }
}
</script>

<style>

</style>
