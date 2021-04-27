import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import AudioVisual from 'vue-audio-visual'
import { remote } from 'electron'

Vue.use(AudioVisual)

Vue.config.productionTip = false
Vue.prototype.$remote = remote
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
