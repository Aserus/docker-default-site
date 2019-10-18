<template lang="pug">
v-navigation-drawer(v-model="drawer" app :clipped="clipped")
	v-list-item-group
		v-list(dense subheader)
			v-subheader Институт аэронавигации
			//navigation-bar-item(icon="mdi-home-city" to="/educations") Образование
			navigation-bar-item(icon="mdi-home-city" to="/retrainings") КПК
			//navigation-bar-item(icon="mdi-home-city" to="/englishes") Уровень анг. яз.
			navigation-bar-item(icon="mdi-home-city" @click="clickFreeWorker()") Начать заполнение
	div
</template>



<script>

import api from "@api"
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
	methods:{
		async clickFreeWorker(){
			const { data } = await api.get('/workers/free')
			console.log(data.worker)
			this.$router.push(`/workers/${data.worker.id}`)
		}
	},
	components:{
		NavigationBarItem
	}
}
</script>

<style lang="less">

</style>
