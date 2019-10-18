import Vue from 'vue'
import VueRouter from 'vue-router'


import Default  from  '@pages/Default.vue'
import NotFound from '@pages/NotFound.vue'
import Signin from '@pages/Signin.vue'

import RetrainingList from '@pages/RetrainingList.vue'
import EnglishList from '@pages/EnglishList.vue'
import EducationList from '@pages/EducationList.vue'
import Worker from '@pages/Worker.vue'



Vue.use(VueRouter)



const router = new VueRouter({
	mode: 'history',
	//base: __dirname,
	routes:[
		{ path:'/', component: Default },
		{ path:'/signin', component: Signin, meta: { allowAnonimus: true } },
		{ path:'/retrainings',
			component: RetrainingList,
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
