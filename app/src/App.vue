<template lang="pug">
v-app#inspire

	template(v-if="!$route.meta.allowAnonimus")
		the-navigation-bar(v-model="drawer" :clipped="clipped")

		v-app-bar(app color="indigo" dark :clipped-left="clipped")
			v-app-bar-nav-icon(@click.stop="drawer = !drawer")
			v-toolbar-title Application

	v-content
		v-breadcrumbs(:items="$route.meta.breadcrumbs" divider=">")
		router-view

	//template(v-if="!$route.meta.allowAnonimus")
		the-footer

	div
</template>



<script>
import jQuery from 'jquery';
window.jQuery = window.$ = jQuery

import TheNavigationBar from '@comp/TheNavigationBar.vue'
import TheFooter from '@comp/TheFooter.vue'


export default {
	name: 'App',
	data: () => ({
		drawer: true,
		clipped: true
	}),
	components:{
		TheNavigationBar,
		TheFooter
	}
}
</script>

<style lang="less">

</style>
