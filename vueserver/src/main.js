// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import {store} from './store'
import JsonExcel from 'vue-json-excel'
 
Vue.component('downloadExcel', JsonExcel)

Vue.use(Vuetify, { theme: {
  primary: '#E0E0E0',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107',
  facebook: '#3b5998',
  google : '#f7f7f7',
  online : '#FFFFFF',
  offline : '#E0E0E0',
  white:    '#FFF',
  grayz : '#666'
}})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  JsonExcel,
  components: { App },
  template: '<App/>'
})
