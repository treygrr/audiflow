import Vue from 'vue'
import Vuex from 'vuex'
import playing from './playing'

Vue.use(Vuex)

const Store = new Vuex.Store({
  modules: {
    playing
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV
})

export default Store

