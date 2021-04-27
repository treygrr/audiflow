import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
import vuetify from './plugins/vuetify'
import AudioVisual from 'vue-audio-visual'
import { ipcRenderer } from 'electron'

const Store = window.require('electron-store')

const estore = new Store();

Vue.use(AudioVisual)

Vue.config.productionTip = false
Vue.prototype.$ipcRenderer = ipcRenderer
Vue.prototype.$store = estore

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
