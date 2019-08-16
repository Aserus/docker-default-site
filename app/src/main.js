import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false


import router from '@router'
import store from './store'

import '@/configs/setup-components'


import vuetify from '@/plugins/vuetify'
import '@/plugins/cookie'




new Vue({
	el: '#app',
	store,
	router,
	vuetify,
	render: r => r(App)
})
