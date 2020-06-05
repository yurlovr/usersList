import Vue from 'vue'
import App from './App.vue'
import store from './store'
import {DatePicker, Table,  TableColumn} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import router from './router/router'

const icon = document.querySelector('.icon')
const closeIcon = document.querySelector('.cross_close')
const commandBlock = document.querySelector('.command')
const input = document.querySelector('.command_line')
let timer = null
icon.addEventListener('dblclick', showCmder)




function enterCommand(event) {
  const value = event.target.value
  if (value.toLowerCase() === 'gulp') {
    input.removeEventListener('input', enterCommand)
    document.body.removeEventListener('click', onFocusInput)
    icon.removeEventListener('dblclick', showCmder)
    closeIcon.removeEventListener('click', closeCmder)
    const app = document.createElement('div')
    const label = document.querySelector('.command')
    app.id = 'app'
    label.remove()
    document.body.insertAdjacentElement('afterbegin', app)

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
  }
}

function onFocusInput() {
  input.focus()
}

function showCmder () {
  icon.style.display="none"
  commandBlock.style.display="block"
  input.focus()
  timer = setTimeout(() => {
    input.placeholder = 'gulp'
  }, 5000)
  closeIcon.addEventListener('click', closeCmder)
  input.addEventListener('input', enterCommand)
  document.body.addEventListener('click', onFocusInput)
}

function closeCmder() {
  commandBlock.style.display = 'none'
  icon.style.display = 'flex'
  input.value = ''
  if (timer) {
    clearTimeout(timer)
  }
}
