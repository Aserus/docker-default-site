<template lang="pug">
v-list-item(:to="to")
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
	}
}
</script>

<style lang="less">

</style>
