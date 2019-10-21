<template lang="pug">
v-app#inspire

	template(v-if="!$route.meta.allowAnonimus")
		the-navigation-bar(v-model="drawer" :clipped="clipped")

		v-app-bar(app color="indigo" dark :clipped-left="clipped")
			v-app-bar-nav-icon(@click.stop="drawer = !drawer")
			v-toolbar-title PG

			template(v-if="userProfile")
				v-spacer
				v-toolbar-title {{userProfile.login}}
				v-btn(icon @click="clickExit()")
					v-icon mdi-exit-to-app


	v-content
		v-breadcrumbs(:items="$route.meta.breadcrumbs" divider=">")
		router-view

	//template(v-if="!$route.meta.allowAnonimus")
		the-footer

	div
</template>



<script>
import jQuery from 'jquery';


import TheNavigationBar from '@comp/TheNavigationBar.vue'
import TheFooter from '@comp/TheFooter.vue'

import { mapGetters } from 'vuex'
import { AUTH_LOGOUT } from '@actions/auth'
import { USER_REQUEST } from '@actions/user'


window.jQuery = window.$ = jQuery



export default {
	name: 'App',
	data: () => ({
		drawer: true,
		clipped: true
	}),
	created() {
		if (this.$store.getters.isAuthenticated){
			this.$store.dispatch(USER_REQUEST)
		}
	},
	computed:{
		...mapGetters(['isProfileLoaded','userProfile']),
	},
	components:{
		TheNavigationBar,
		TheFooter
	},
	methods:{
		clickExit(){
			this.$store.dispatch(AUTH_LOGOUT)
			this.$router.push('/signin')
		}
	}
}
</script>

<style lang="less">

</style>
