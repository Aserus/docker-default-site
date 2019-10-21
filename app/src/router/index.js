import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store' // your vuex store

import Default  from  '@pages/Default.vue'
import NotFound from '@pages/NotFound.vue'
import Signin from '@pages/Signin.vue'

import RetrainingList from '@pages/RetrainingList.vue'
import EnglishList from '@pages/EnglishList.vue'
import EducationList from '@pages/EducationList.vue'
import Worker from '@pages/Worker.vue'



Vue.use(VueRouter)

const ifNotAuthenticated = (to, from, next) => {
	if (!store.getters.isAuthenticated) return next()
	next('/')
}

const ifAuthenticated = (to, from, next) => {
	if (store.getters.isAuthenticated) return next()
	next('/signin')
}

/*
function docBeforeEnter(to, from, next){
	if (!store.getters.isAuthenticated) return next('/signin')
	next()
}
*/

const router = new VueRouter({
	mode: 'history',
	//base: __dirname,
	routes:[
		{ path:'/', component: Default,beforeEnter: ifAuthenticated,  },
		{ path:'/signin', component: Signin,beforeEnter: ifNotAuthenticated, meta: { allowAnonimus: true } },
		{ path:'/retrainings',
			component: RetrainingList,
			beforeEnter: ifAuthenticated,
			meta: {
				breadcrumbs: [
					{
						text: 'Институт аэронавигации'
					},
					{
						text: 'Кпк'
					}
				]
			}
		},
		{ path:'/englishes',
			component: EnglishList,
			beforeEnter: ifAuthenticated,
			meta: {
				breadcrumbs: [
					{
						text: 'Институт аэронавигации'
					},
					{
						text: 'Уровень анг. яз.'
					}
				]
			}
		},
		{ path:'/educations',
			component: EducationList,
			beforeEnter: ifAuthenticated,
			meta: {
				breadcrumbs: [
					{
						text: 'Институт аэронавигации'
					},
					{
						text: 'Образование'
					}
				]
			}
		},
		{ path:'/workers/:ID',
			component: Worker,
			beforeEnter: ifAuthenticated,
			meta: {
				breadcrumbs: [
					{
						text: 'Госкорпорация'
					},
					{
						text: 'Сотрудник'
					}
				]
			}
		},


		{ path: '*', component: NotFound }
	]
})

export default router
