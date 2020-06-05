import Vue from 'vue'
import Vuex from 'vuex'
import appModule from './modules/app'
import pageModule from './modules/pages'
import modalModule from './modules/modal'
import userModule from './modules/user'
import appController from './controllers/appController'
import pageController from './controllers/pageController'
import modalController from './controllers/modalController'
import userController from './controllers/userController'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app: appModule,
    page: pageModule,
    modal: modalModule,
    user: userModule
  },
  plugins: [
    appController(),
    pageController(),
    modalController(),
    userController()
  ]
})
