import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import router from './router/index'

import TypeNav from './components/TypeNav'
import Pagination from './components/Pagination'
// 引入仓库
import store from './store'

// 引入mock
import  './mock/mockServe'

// 引入swiper
import "swiper/css/swiper.css"
// 引入api模块
import * as API from '@/api'
// 引入elementui组件
import { Button, Select, MessageBox, Message,} from 'element-ui';

//引入图片懒加载
import VueLazyload from 'vue-lazyload' 

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(TypeNav.name,TypeNav,Pagination)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

const loadimage = require('./assets/R-C.gif')
const errorimage = require('./assets/R-C2.gif')
// 使用懒加载插件
Vue.use(VueLazyload, {
  
  
  loading: loadimage,
  
})
// 引入表单验证插件
import "@/plugins/validate"

new Vue({
  render: h => h(App),
  // 注册全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this,
    Vue.prototype.$API = API
  },
  //注册路由
  router,
  // 注册仓库
  store
}).$mount('#app')
