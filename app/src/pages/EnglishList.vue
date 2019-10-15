<template lang="pug">
page-content
	v-card
		//pre {{list[0] || null}}
		v-card-title Уровень анг. яз.
			.flex-grow-1
			v-text-field(
				v-model="search"
				append-icon="search"
				label="Search"
				single-line
				hide-details)



		v-data-table(:headers="headers" :items="listComputed"  :items-per-page="30"  :search="search")
			template(v-slot:item.action="{ item }")
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
		headers: [
			{ text: 'ID', value: 'id', width:'1%', class:'text-truncate' },
			{ text: 'Организация', value: 'testerText'},
			{ text: 'icaoLevel', value: 'icaoLevel'},
			{ text: 'Тест', value: 'testText' },
			{ text: 'Сертификат №', value: 'certNo', class:'text-truncate'},
			{ text: 'Сертификат дата', value: 'certDate', class:'text-truncate'},
			//{ text: 'worker_id', value: 'worker_id', class:'text-truncate',width:'1%'},
		//	{ text: 'Actions', value: 'action', sortable: false },
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
			return this.list //this.list.slice(Math.max(this.list.length-100,0))
		}
	},
	mounted(){
		this.uploadData()
	},
	methods:{
		async uploadData(){
			const { data } = await api.get('/englishes')
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
