<template lang="pug">
v-list-item(:to="to" @click="clickItem")
	v-list-item-action
		v-icon {{icon}}
	v-list-item-content
		v-list-item-title
			slot
</template>



<script>

export default {
	props:{
		to:String,
		//text: String,
		icon: String
	},
	methods:{
		clickItem(e){
			this.$emit('click',e)
		}
	}
}
</script>

<style lang="less">

</style>
