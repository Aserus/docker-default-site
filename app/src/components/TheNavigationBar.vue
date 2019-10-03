<template lang="pug">
v-navigation-drawer(v-model="drawer" app :clipped="clipped")
	v-list-item-group

		v-list(dense subheader)
			v-subheader Институт аэронавигации
			navigation-bar-item(icon="mdi-home-city" to="/ia/subdivisions") Филиалы
			navigation-bar-item(icon="mdi-account-group" to="/ia/groups") Отделы
			navigation-bar-item(icon="mdi-account" to="/ia/workers") Струдники
			navigation-bar-item(icon="mdi-script-text" to="/ia/programs") Программы
			navigation-bar-item(icon="mdi-text-subject" to="/ia/disciplines") Дисциплины


		v-list(dense subheader)
			v-subheader Госкорпорация
			navigation-bar-item(icon="mdi-home-city" to="/gos/subdivisions") Филиалы
			navigation-bar-item(icon="mdi-airport" to="/gos/airplanes") Центры
			navigation-bar-item(icon="mdi-briefcase-account" to="/gos/posts") Должности



	div
</template>



<script>
import NavigationBarItem from './NavigationBarItem.vue'


export default {
	props:{
		value: Boolean,
		clipped: Boolean
	},
	computed:{
		drawer:{
			get(){	return this.value	},
			set(v){	this.$emit('input',v)	}
		}
	},
	components:{
		NavigationBarItem
	}
}
</script>

<style lang="less">

</style>
