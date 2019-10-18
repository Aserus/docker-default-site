<template lang="pug">
v-dialog(v-model="dialogShow" max-width="600px")
	template(v-slot:activator="{ on }")
		span(v-on="on") {{ item.institution }}

	v-card
		v-card-title {{ item.institution }}
		v-card-text
			v-select(v-model="subdivisionUpdate" :items="subdivisionOptions" label="Выберите организацию")
			v-checkbox(v-model="editAll" label="Применить ко всему").ma-0.mr-auto
		v-card-actions
			v-spacer
			v-btn( @click="cancel()") Отменить


			v-btn(color="blue" @click="save()") Применить
</template>



<script>
import api from "@api"

export default {
	props:{
		item:Object,
		subdivisionOptions:Array
	},
	data: ()=>({
		subdivisionUpdate:null,
		editAll:null,
		dialogShow: null
	}),
	methods:{
		async save() {

			const params = {
				editAll: this.editAll,
				institution_id: this.subdivisionUpdate,
				institution: this.item.institution
			}

			await api.put(`/retrainings/${this.item.id}`,params)
			this.$emit('saved')
    },
		cancel(){
			this.dialogShow = false
		}
	}
}
</script>

<style lang="less">

</style>
