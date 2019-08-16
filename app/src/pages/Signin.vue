<template lang="pug">
page-content(fill)
	v-layout(align-center justify-center)
		v-flex(xs12 sm8 md4)
			signin-form
</template>



<script>
import SigninForm from '@comp/SigninForm.vue'

export default {
	components:{
		SigninForm
	}
}
</script>

<style>

</style>
