import Vue from 'vue'
import App from './App.vue'
import store from './store'
import {DatePicker, Table,  TableColumn} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import router from './router/router'

Vue.config.productionTip = false
locale.use(lang)
Vue.use(DatePicker, {locale});
Vue.use(Table)
Vue.use(TableColumn)

new Vue({
  store,
  render: h => h(App),
  router
}).$mount('#app')