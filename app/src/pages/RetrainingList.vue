<template lang="pug">
page-content
	v-card

		v-card-title КПК
			.flex-grow-1
			v-text-field(
				v-model="search"
				append-icon="search"
				label="Search"
				single-line
				hide-details)

		//div.pa-3
			v-radio-group(v-model="groupByRadio" row label="Группировать")
				v-radio(label="нет")
				v-radio(label="организация" value="institution")

		v-responsive(style="overflow-x:scroll")
			div(style="width:2800px")
				v-data-table(item-key="id"
					:headers="headers"
					:items="listComputed"
					:items-per-page="30"
					:search="search"
					:group-by="groupBy"
					:loading="loading"
					loading-text="Загрузка... Пожалуйста подождите"
					)
					template(v-slot:item.action="{ item }")
						.text-center
							//v-icon.mr-2(small @click="editItem(item)")
								| edit
							v-icon(small @click="hideItem(item)")
								| mdi-eye

					//template(v-slot:item.diplomNo="props")
						span.text-truncate {{ props.item.institution }}
					template(v-slot:item.institution="props")
						v-edit-dialog(:return-value.sync="props.item.institution" @save="save" @cancel="cancel" @open="open" @close="close")
							| {{ props.item.institution }}
							template(v-slot:input)

								v-select(:items="subdivisionOptions" label="Выберите организацию")
								//v-text-field(v-model="props.item.institution" label="Edit" single-line counter)
								div.d-flex.justify-space-between
										v-checkbox(v-model="editAll" label="Применить ко всему" value="1").ma-0
										v-btn Применить
					template(v-slot:item._education="props")
						div(v-if="props.item._educations && props.item._educations.length")
							div(v-for="education in props.item._educations")
								| {{ education.level }} - {{ education.diplomDate }} -
								small.ml-1 {{ education.institution }}

	div
</template>



<script>
import api from "@api"



export default {
	data: ()=>({
		loading: false,
		snack: false,
		snackColor: '',
		snackText: '',
		editAll:null,
		subdivisionList:[],
	//	workerEducationAssoc: {},
		groupByRadio:0,
		tab: null,
		headers: [

			//{ text: 'ID', value: 'id', width:'1%', class:'text-truncate' },
			{ text: '#', value: 'action', width:'1%',align:'center',class:'text-truncate',sortable: false },
			{ text: 'Организация КПК', value: 'institution',width: 600},
			{ text: 'Программа', value: 'course',width: 500 },
			{ text: 'Диплом № ', value: 'diplomNo',width: 200, class:'text-truncate'},
			{ text: 'Диплом дата', value: 'diplomDate',width: 90, class:'text-truncate'},
			{ text: 'worker_id', value: 'worker_id', class:'text-truncate',width:'1%'},
			{ text: 'Где работает', value: '_worker_subdivision_text', class:'text-truncate',width:300,filter:false},
			{ text: 'Должность', value: '_worker_post_text', class:'text-truncate',width:300,filter:false},
			{ text: 'Образование', value: '_education', class:'text-truncate',width:350,filter:false},
			{ text: '#', value: 'action', width:'1%',align:'center',class:'text-truncate',sortable: false },
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
			const list = this.list.slice()
			return list
		},
		subdivisionOptions(){
			return this.subdivisionList.map(item => ({ text: item.name, value: item.id}))
		}
	},
	mounted(){
		this.uploadData()

	},
	methods:{
		async uploadData(){
			this.loading = true;
			await this.uploadRetraining()
			await this.uploadSubdivision()
			await this.uploadEducation()
			this.loading = false
		},
		async uploadRetraining(){
			const { data } = await api.get('/retrainings',{params:{limit:220}})
			this.list = data.list
		},
		async uploadSubdivision(){
			const { data } = await api.get('/ia/subdivisions')
			this.subdivisionList = data.list
		},
		async uploadEducation(){
			const assoc = {}
			const { data } = await api.get('/educations')
			data.list.forEach(item => {
				if(!assoc[item.worker_id]) assoc[item.worker_id] = []
				assoc[item.worker_id].push(item)
			})

			this.list.forEach( item=> {
				if(assoc[item.worker_id]){
					item._educations = assoc[item.worker_id]
				}
			})
		},
		hideItem(){
			alert('hide')
		},
		editItem(){
			alert('edit')
		},
		save () {
      this.snack = true
      this.snackColor = 'success'
      this.snackText = 'Data saved'
    },
    cancel () {
      this.snack = true
      this.snackColor = 'error'
      this.snackText = 'Canceled'
    },
    open () {
      this.snack = true
      this.snackColor = 'info'
      this.snackText = 'Dialog opened'
    },
    close () {
      console.log('Dialog closed')
    },
	}
}
</script>

<style>

</style>
