<template lang="pug">
page-content
	v-card



		v-tabs(v-model="filterType")
			v-tab Необработанные организации
			v-tab Необработанные программы
			v-tab Не наши организации
			v-tab Наши организации
			v-tab Полностью обработанные Института


		v-responsive(style="overflow-x:scroll")
			div(style="width:2800px")
				v-data-table(
					ref="table"
					v-model="selectData"

					item-key="id"
					:headers="headers"
					:items="listComputed"
					:items-per-page="60"
					:loading="loading"
					loading-text="Загрузка... Пожалуйста подождите"
					show-select
					)
					template(v-slot:item.action="{ item }")
						div(v-if="item.state==1")
							v-btn(@click="hideItem(item)")
								v-icon
									| mdi-eye
						div(v-else)
							v-btn(@click="showItem(item)")
								v-icon
									| mdi-eye

					//template(v-slot:item.diplomNo="props")
						span.text-truncate {{ props.item.institution }}
					template(v-slot:item.status1="{ item }")
						v-icon(v-if="item.institution_id" color="green") mdi-checkbox-marked-circle

					template(v-slot:item.institution="props")
						div(@click="clickOrg(props.item)")
							template(v-if="props.item.institution_id")
								div {{instText(props.item)}}
								span.small {{props.item.institution}}
							template(v-else)
								span {{props.item.institution}}
					template(v-slot:item.status2="{ item }")
						v-icon(v-if="item.program_id" color="green") mdi-checkbox-marked-circle
					template(v-slot:item.course="props")
						div(@click="clickProgram(props.item)")
							template(v-if="props.item.program_id")
								//div {{instText(props.item)}}
								span.small {{props.item.course}}
							template(v-else)
								span {{props.item.course}}

					template(v-slot:item._education="props")
						div(v-if="props.item._educations && props.item._educations.length")
							div(v-for="education in props.item._educations")
								| {{ education.level }} - {{ education.diplomDate }} -
								small.ml-1 {{ education.institution }}
					template(v-slot:item.updatedAt="props")
						span.small {{dateFromNow(props.item.updatedAt)}}



					template(v-slot:header="{ props: { headers } }")
						thead
							tr
								td {{listComputed.length}}
								td
								td
									template(v-if="[1,3,4].includes(filterType)")
										v-select(v-model="searchObj.institution_id" :items="subdivisionOptions" label="Выберите организацию" clearable)
									template(v-else)
										v-text-field(v-model="searchObj.institution" clearable)

								td
								td
									v-text-field(v-model="searchObj.course" clearable)
								td
									v-text-field(v-model="searchObj.diplomNo" clearable)
								td
								td
								td
									v-text-field(v-model="searchObj._worker_subdivision_text")


	v-dialog(v-if="dialogShow" v-model="dialogShow" max-width="600px")
		v-card
			v-card-title {{ selectItem.institution }}
			v-card-text
				v-select(v-model="subdivisionUpdate" :items="subdivisionOptions" label="Выберите организацию" dense)
				v-checkbox(v-model="editAll" label="Применить ко всему").ma-0.mr-auto
			v-card-actions
				v-btn( @click="saveNotInst()" text).mr-auto Не институт
				v-spacer
				v-btn( @click="cancel()") Отменить


				v-btn(color="blue" @click="save()") Применить

	v-dialog(v-if="dialogProgramShow" v-model="dialogProgramShow" max-width="700px")
		v-card
			//v-card-title {{ selectItem.institution }}
			v-card-title
				//div {{ selectItem.institution }}
				h5
					span(v-for="word in splitCourse(selectItem.course)" :key="word" @click="clickProgramWork(word)").mr-1
						| {{ word }}
			v-card-text
				v-autocomplete(v-model="programIdUpdate" label="Выберите программу" :items="programOptions" clearable dense search-input="")#program-autocomlete
				//v-select(v-model="programIdUpdate" :items="programOptions" label="Выберите программу" dense)
				//v-select(v-model="programIdUpdate" :items="programOptions" label="Выберите программу" dense)
				//v-checkbox(v-model="editAll" label="Применить ко всему").ma-0.mr-auto
			v-card-actions
				v-btn( @click="cancelProgram()").mr-auto Отменить
				v-btn(color="blue" @click="saveProgram()") Применить



	v-snackbar(v-model="snackbar" :timeout="0")
		div(style="width:600px;")

			div
				v-select(v-model="subdivisionUpdate" :items="subdivisionOptions" label="Выберите организацию" dense)
			div.d-flex
				div Выделено {{selectData.length}}
				v-btn(color="pink" @click="saveSelect()") Сохранить

	div
</template>



<script>
import api from "@api"
import moment from "moment"
import $ from "jquery"
moment.locale("ru")


/*
$(document).on('click','table tr td .v-data-table__checkbox',(e)=>{
	console.log(e)
})

$(document).on('click','table tr td .v-icon',(e)=>{
	console.log(e)
})

$(document).on('click','table',(e)=>{
	console.log($('table tr td .v-icon'))
	console.log(e)
})
*/

export default {
	data: ()=>({
		searchObj:{
			institution:null,
			institution_id:null,
			course:null,
			_worker_subdivision_text:null,
			diplomNo:null,
		},
		snackbar:false,
		loading: false,
		selectData: [],
		editAll:null,
		subdivisionList:[],
		programList:[],
		programIdUpdate: null,
		subdivisionUpdate:null,
	//	workerEducationAssoc: {},
		dialogShow: false,
		selectItem:null,
		tab: null,
		dialogProgramShow:false,
		headers: [

			//{ text: 'ID', value: 'id', width:'1%', class:'text-truncate' },

			//{ text: '#', value: 'action', width:'1%',align:'center',class:'text-truncate',sortable: false },
			{ text: '', value: 'status1',width: "1%",sortable: false },
			{ text: 'Организация КПК', value: 'institution',width: 600},
			{ text: '', value: 'status2',width: "1%"},
			{ text: 'Программа', value: 'course',width: 500 },
			{ text: 'Диплом № ', value: 'diplomNo',width: 200, class:'text-truncate'},
			{ text: 'Диплом дата', value: 'diplomDate',width: 90, class:'text-truncate'},
			{ text: 'worker_id', value: 'worker_id', class:'text-truncate',width:'1%'},
			{ text: 'Где работает', value: '_worker_subdivision_text', class:'text-truncate',width:300,filter:false},
			{ text: 'Должность', value: '_worker_post_text', class:'text-truncate',width:300,filter:false},
			{ text: 'Образование', value: '_education', class:'text-truncate',width:350,filter:false},
			{ text: 'Дата исправления', value: 'updatedAt', class:'text-truncate',width:350,filter:false},
		//	{ text: '#', value: 'action', width:'1%',align:'center',class:'text-truncate',sortable: false },
		],
		list: [],
		searchTimer:null,
		filterType:0,
		programSearch:null
	}),
	computed:{
		listComputed(){
			let list = this.list.slice()
			list.sort((a,b)=>{
				if(a.institution > b.institution) return 1
				if(a.institution < b.institution) return -1

				return 0
			})

			const searchObj = {}
			Object.entries(this.searchObj).map(([key, value])=>{
				if(value){
					let v = value
					if(typeof(value)=='string'){
						v = value.toLowerCase()
					}
					searchObj[key]=v
				}
			})
			if([1,3,4].includes(this.filterType) && typeof(searchObj.institution) !== 'undefined'){
				delete searchObj.institution
			}
			if(![1,3,4].includes(this.filterType) && typeof(searchObj.institution_id) !== 'undefined'){
				delete searchObj.institution_id
			}

			console.log(searchObj)
			if(Object.keys(searchObj).length){
				const entr = Object.entries(searchObj)
				//console.log(searchObj)
				list = list.filter(item => {

					for(let [key,value] of entr){
						if(typeof(item[key]) ==='number'){
							if(item[key] != value) return false
						}else {
							if(!item[key]) return false
							let str = item[key].toLowerCase()
							if(str.indexOf(value)<0) return false
						}
					}
					return true;

				})
			}


			return list
		},
		subdivisionOptions(){
			let list = this.subdivisionList.map(item => ({ text: `${item.name} (г.${item.city})`, value: item.id}))
			list.unshift({text:'# Не институт #',value:0})
			return list
		},
		programOptions(){
			let list = this.programList.map(item => ({ text: `${item.code} - ${item.name}`, value: item.id}))
			return list
		},
		subdivisionAssoc(){
			const assoc = {}
			this.subdivisionList.forEach(item=> {
				assoc[item.id] = item
			})
			return assoc
		}
	},
	mounted(){
		this.uploadData()

	},
	created(){

	},
	methods:{
		async uploadData(){
			this.loading = true;
			await this.uploadRetraining()
			await this.uploadSubdivision()
			//await this.uploadEducation()
			await this.uploadProgram()
			this.loading = false
		},
		async uploadRetraining(){

			//console.log(this.filterType,'filterType')


			const search={}


			switch(this.filterType){
				case 0:
					search.institution_id = {
						operator:'=',
						value:null
					}
					break;
				case 1:
					search.institution_id = {
						operator:'>',
						value:0
					}
					search.program_id = {
						operator:'=',
						value:null
					}
					break;
				case 2:
					search.institution_id = 0
					break;
				case 3:
					search.institution_id = {
						operator:'>',
						value:0
					}
					break;
				case 4:
					search.institution_id = {
						operator:'>',
						value:0
					}
					search.program_id = {
						operator:'<>',
						value:null
					}
					break;
				default: break;
			}

			const params = {
				limit: 999220,
				search
			}


			//this.filterType


			const { data } = await api.get('/retrainings',{ params })
			this.list = data.list
		},
		async uploadSubdivision(){
			const { data } = await api.get('/ia/subdivisions')
			this.subdivisionList = data.list
		},
		async uploadProgram(){
			const { data } = await api.get('/ia/programs')
			this.programList = data.list
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
		async savedSubdivision(){
			this.loading = true;
			await this.uploadRetraining()
			this.loading = false;
		},
		async hideItem(item){
			await api.put(`/retrainings/${item.id}`,{
				institution_id: 0
			})
			//item.institution_id = 0
		},
		async showItem(item){
			await api.put(`/retrainings/${item.id}`,{state:1})
			//item.state = 1
		},
		async saveSelect(){
			console.log(this.selectData)


			const listID = this.selectData.map(item => {
				return item.id
			})
			console.log(listID)
			await api.put(`/retrainings`,{
				ids: listID,
				institution_id: this.subdivisionUpdate
			})


			this.snackbar = false;
			this.selectData = []

			this.loading = true;
			await this.uploadRetraining()
			this.loading = false;

		},

		clickProgram(item){
			this.selectItem=item;
			this.dialogProgramShow=true
		},

		clickOrg(item){
			console.log('not shift')
			this.selectItem=item;
			this.dialogShow=true
		},

		updateRetraining(item){
			console.log(item);

		},

		async save() {

			const params = {
				editAll: this.editAll,
				institution_id: this.subdivisionUpdate,
				institution: this.selectItem.institution
			}

			await api.put(`/retrainings/${this.selectItem.id}`,params)
			this.dialogShow = false
			this.selectItem = null
			this.savedSubdivision()
		},
		async saveProgram() {
			const params = {
				//editAll: this.editAll,
				program_id: this.programIdUpdate,
			}

			await api.put(`/retrainings/${this.selectItem.id}`,params)
			this.dialogProgramShow = false
			this.itemProgramSelect = null
			this.savedSubdivision()
		},
		async saveNotInst() {
			const params = {
				institution_id: 0,
				institution: this.selectItem.institution
			}

			await api.put(`/retrainings/${this.selectItem.id}`,params)
			this.dialogShow = false
			this.selectItem = null
			this.savedSubdivision()
    },
		cancel(){
			this.dialogShow = false
		},
		cancelProgram(){
			this.dialogProgramShow = false
		},
		dateFromNow(d){
			return moment(d).fromNow()
		},
		async realodData(){
			this.loading = true;
			await this.uploadRetraining()
			this.loading = false
		},
		instText(item){
			if(!item.institution_id) return null;
			if(!this.subdivisionAssoc[item.institution_id]) return null;
			const subd = this.subdivisionAssoc[item.institution_id];

			return `${subd.name} (г.${subd.city})`
		},
		splitCourse(str){
			return str.split(' ');
		},
		clickProgramWork(word){
			console.log(word)
			const $obj = $('#program-autocomlete')
			//console.log($obj)
			$obj.val(word)
			$obj.trigger('keyup')
			$obj.trigger('keypress')
			$obj.trigger('keydown')
			//$obj[0].focus()

			//
		}

	},
	watch:{
		selectData(v){
			if(v.length){
				this.snackbar = true
			}else{
				this.snackbar = false
			}
		},
		filterType(){
			this.realodData()

		}
	}
}
</script>

<style>
table tr td.text-center:first-child{
	vertical-align: top;
}
.v-responsive .v-data-footer{
	-webkit-box-pack: start;
	-ms-flex-pack: start;
	justify-content: flex-start;
}

table td .small{
	font-size:70%;
}
</style>
