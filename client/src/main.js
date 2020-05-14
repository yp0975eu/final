import Vue from 'vue'
import App from './App.vue'

import BootstrapVue from 'bootstrap-vue'
import entriesServices from './services/entriesServices'

import VueRouter from 'vue-router'
import router from './router'

Vue.use(VueRouter) // register vueRouter plugin

Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.prototype.$entriesServices = entriesServices
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
