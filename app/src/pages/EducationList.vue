<template lang="pug">
page-content
	v-card
		//pre {{list[0] || null}}
		v-card-title Образование
			.flex-grow-1
			v-text-field(
				v-model="search"
				append-icon="search"
				label="Search"
				single-line
				hide-details)

		div.pa-3
			p Группировать
			v-radio-group(v-model="groupByRadio" row)
				v-radio(label="нет")
				v-radio(label="организация" value="institution")


		v-data-table(:headers="headers" :items="listComputed"  :items-per-page="30"  :search="search" :group-by="groupBy")

			//template(v-slot:item.action="{ item }")
				v-icon.mr-2(small @click="editItem(item)")
					| edit
				v-icon(small @click="deleteItem(item)")
					| delete



	div
</template>



<script>
import api from "@api"



export default {
	data: ()=>({
		groupByRadio:0,
		tab: null,
		headers: [
			{ text: 'ID', value: 'id', width:'1%', class:'text-truncate' },
			{ text: 'Организация', value: 'institution'},
			{ text: 'level', value: 'level', width:'1%' },
			{ text: 'Диплом № ', value: 'diplomNo', class:'text-truncate'},
			{ text: 'Диплом дата', value: 'diplomDate', class:'text-truncate'},
			//{ text: 'worker_id', value: 'worker_id', class:'text-truncate',width:'1%'},
			//{ text: 'Actions', value: 'action', sortable: false },
		],
		search:null,
		list: []
	}),
	computed:{
		groupBy(){
			if(!this.groupByRadio) return null;
			return this.groupByRadio
		},
		listComputed(){
			return this.list.slice(Math.max(this.list.length-100,0))
		}
	},
	mounted(){
		this.uploadData()
	},
	methods:{
		async uploadData(){
			const { data } = await api.get('/educations')
			this.list = data.list
		},
		deleteItem(){
			alert('delete')
		},
		editItem(){
			alert('edit')
		}
	}
}
</script>

<style>

</style>
