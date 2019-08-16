<template lang="pug">
v-navigation-drawer(v-model="drawer" app :clipped="clipped")
	v-list(dense)
		v-list-item(@click)
			v-list-item-action
				v-icon mdi-home
			v-list-item-content
				v-list-item-title Home
		v-list-item(@click)
			v-list-item-action
				v-icon mdi-contact-mail
			v-list-item-content
				v-list-item-title Contact

	div
</template>



<script>

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
	}
}
</script>

<style lang="less">

</style>
