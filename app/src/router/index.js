import Vue from 'vue'
import VueRouter from 'vue-router'


import Default  from  '@pages/Default.vue'
import NotFound from '@pages/NotFound.vue'
import Signin from '@pages/Signin.vue'



Vue.use(VueRouter)



const router = new VueRouter({
	mode: 'history',
	//base: __dirname,
	routes:[
		{ path:'/', component: Default },
		{ path:'/signin', component: Signin, meta: { allowAnonimus: true } },

		{ path: '*', component: NotFound }
	]
})

export default router
