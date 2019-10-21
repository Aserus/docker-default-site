<template lang="pug">
v-card.elevation-12
	v-toolbar(color="primary" dark flat)
		v-toolbar-title Вход
		v-spacer
		//v-tooltip(bottom)
			template(v-slot:activator="{ on }")
				v-btn(href="source" icon large target="_blank" v-on="on")
					v-icon mdi-code-tags
			span Source
		//v-tooltip(right)
			template(v-slot:activator="{ on }")
				v-btn(icon large href="https://codepen.io/johnjleider/pen/pMvGQO" target="_blank" v-on="on")
					v-icon mdi-codepen
			span Codepen


	v-card-text
		v-form
			v-text-field(v-model="credentials.username" label="Логин" name="login" prepend-icon="mdi-account" type="text" autocomplete="login")
			v-text-field#password(v-model="credentials.password"  label="Пароль" name="password" prepend-icon="mdi-lock" type="password" autocomplete="password")
	v-card-actions
		v-spacer
		v-btn(color="primary" @click="submitSignin()") Войти
</template>



<script>
import {AUTH_REQUEST} from '@actions/auth'
import { mapGetters } from 'vuex';


export default {
	data: () => ({
		isLoading: false,
		credentials:{
			username: null,
			password: null
		}
	}),
	computed: {
		...mapGetters([ 'isAuthenticated' ])
	},
	methods:{
		async submitSignin() {
			this.$store.dispatch(AUTH_REQUEST, this.credentials).catch(()=>true)
		}
	},
	watch:{
		isAuthenticated(v){
			if(v)	this.$router.push('/')
		}
	},
	components:{

	}
}
</script>


<style>

</style>
