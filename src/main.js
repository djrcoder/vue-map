import Vue from 'vue'

import { MdButton, MdCard, MdRipple } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'
import App from './App.vue'
import 'leaflet/dist/leaflet.css';

Vue.use(MdButton)
Vue.use(MdCard)
Vue.use(MdRipple)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')


