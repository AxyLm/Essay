import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueVirtualScroller from 'vue-virtual-scroller'
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import routes from "./route"
import { Col, Row, Image as VanImage } from 'vant';

Vue.config.productionTip = false

 

Vue.use(VanImage)
Vue.use(Col)
Vue.use(Row)
Vue.use(VueRouter)
Vue.use(VueVirtualScroller)
new Vue({
  router: new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior: () => ({ y: 0 })
  }),
  render: h => h(App),
}).$mount('#app')
