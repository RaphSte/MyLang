import Vue from 'nativescript-vue'
import Home from './components/Home.vue'
import VueDevtools from 'nativescript-vue-devtools'

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}


// Prints Vue logs when --env.production is *NOT* set while building
// Vue.config.silent = (TNS_ENV === 'production')
Vue.config.silent = (TNS_ENV === 'not-production')


new Vue({
  
  render: h => h('frame', [h(Home)])
}).$start()
