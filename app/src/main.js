import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false


import router from '@router'
import store from './store'

import '@/configs/setup-components'


import vuetify from '@/plugins/vuetify'
import i18n from '@/plugins/i18n'

import '@/plugins/cookie'





new Vue({
    el: '#app',
    store,
    router,
    vuetify,
    i18n,
    render: r => r(App)
})
