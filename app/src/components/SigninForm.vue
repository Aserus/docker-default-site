<template lang="pug">
v-card.elevation-12
	v-toolbar(color="primary" dark flat)
		v-toolbar-title Login form
		v-spacer
		v-tooltip(bottom)
			template(v-slot:activator="{ on }")
				v-btn(href="source" icon large target="_blank" v-on="on")
					v-icon mdi-code-tags
			span Source
		v-tooltip(right)
			template(v-slot:activator="{ on }")
				v-btn(icon large href="https://codepen.io/johnjleider/pen/pMvGQO" target="_blank" v-on="on")
					v-icon mdi-codepen
			span Codepen


	v-card-text
		v-form
			v-text-field(label="Login" name="login" prepend-icon="mdi-account" type="text" autocomplete="login")
			v-text-field#password(label="Password" name="password" prepend-icon="mdi-lock" type="password" autocomplete="password")
	v-card-actions
		v-spacer
		v-btn(color="primary") Login
</template>



<script>
export default {}
</script>

<style>

</style>
