import Vue from 'vue'
import VueRouter from 'vue-router'


import Default  from  '@pages/Default.vue'
import NotFound from '@pages/NotFound.vue'
import Signin from '@pages/Signin.vue'
import IaSubdivisionList from '@pages/IaSubdivisionList.vue'
import IaWorkerList from '@pages/IaWorkerList.vue'
import IaGroupList from '@pages/IaGroupList.vue'
import IaDisciplineList from '@pages/IaDisciplineList.vue'
import IaProgramList from '@pages/IaProgramList.vue'

import GosAirplaneList from '@pages/GosAirplaneList.vue'
import GosSubdivisionList from '@pages/GosSubdivisionList.vue'
import GosPostList from '@pages/GosPostList.vue'



Vue.use(VueRouter)



const router = new VueRouter({
	mode: 'history',
	//base: __dirname,
	routes:[
		{ path:'/', component: Default },
		{ path:'/signin', component: Signin, meta: { allowAnonimus: true } },
		{ path:'/ia/subdivisions', component: IaSubdivisionList },
		{ path:'/ia/groups', component: IaGroupList },
		{ path:'/ia/workers', component: IaWorkerList },
		{ path:'/ia/programs', component: IaProgramList },
		{ path:'/ia/disciplines', component: IaDisciplineList },

		{ path:'/gos/subdivisions', component: GosSubdivisionList },
		{ path:'/gos/airplanes', component: GosAirplaneList },
		{
			path:'/gos/posts',
			component: GosPostList,
				meta: {
					breadcrumbs: [
						{
							text: 'Госкорпорация'
						},
						{
							text: 'Должности'
						}
					]
				}

			},

		{ path: '*', component: NotFound }
	]
})

export default router
