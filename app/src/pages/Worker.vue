<template lang="pug">
page-content
	template(v-if="worker")
		v-row
			v-col(cols="3")

				v-card(v-if="worker.processed" tile md).mb-6
					v-card-title.py-3
						span.mr-2
							v-icon(v-if="worker.processed==1") mdi-checkbox-marked-circle
							v-icon(v-if="worker.processed==-1") mdi-alert-circle
						| {{processedText}}

				v-card( tile md).mb-6
					v-card-title Сотрудник № {{worker.id}}
					v-card-text
						div {{ worker.post_text }}
						div {{ worker.subdivisionText }}

				v-card( tile).mb-6
					v-card-title Образование

					v-list-item(v-for="item in educationList" :key="item.id"  three-line)
						v-list-item-content
							v-list-item-title {{ item.level }} — {{ dateHuman(item.diplomDate) }}

							v-list-item-subtitle
								| Номер: {{ item.diplomNo }}
							v-list-item-subtitle
								| {{ item.institution }}

				v-card( tile)
					v-card-title Тестирование по английскому

					v-list-item(v-for="item in worker.englishList" :key="item.id"  three-line)
						v-list-item-content
							v-list-item-title Уровен: {{ item.icaoLevel }}  — {{ dateHuman(item.certDate) }}

							v-list-item-subtitle
								| Номер: {{ item.certNo }}
							v-list-item-subtitle
								| {{ item.testText }}
							v-list-item-subtitle
								| {{ item.testerText }}

			v-col
				v-card(tile)
					v-card-title.d-flex
						span.mr-auto КПК
						v-btn(color="primary" @click="clickSave()" small :disabled="!isGood")
							v-icon.mr-1 save
							| Сохранить и далее
					v-data-table(:items="retrainingList" :headers="retrainingHeaders" :items-per-page="100" hide-default-footer)
						template(v-slot:item.diplomDate="{ item }")
							span.text-truncate {{dateHuman(item.diplomDate)}}
						template(v-slot:item.about="{ item }")
							div Программа:
								b.ml-2 {{ item.course }}
							v-divider
							.d-flex.justify-space-between
								div От:
									span.ml-2(v-if="item.institutionText") {{ item.institutionText }}
									span.ml-2(v-else) {{ item.institution }}
								small.text-truncate Номер: {{ item.diplomNo }}

						template(v-slot:item.action="{ item }")

							v-radio-group(row v-model="item.type" @change="typeChanged(item)")
								v-radio(label="Спец" :value="1")
								v-radio(label="Незнаю" :value="3")
								v-radio(label="Англ" :value="2")
				.d-flex.mt-3.justify-space-between
					v-btn(color="secondary" @click="clickCancel()").mr-auto Пропустить
					v-btn(color="secondary" @click="clickClear()").mr-auto Очистить
					v-btn(color="primary" @click="clickSave()" :disabled="!isGood")
						v-icon.mr-1 save
						| Сохранить и далее
		//pre {{worker}}
		div
</template>



<script>
import api from "@api"
import moment from "moment"
//01012013

export default {
	data: ()=>({
		worker: null,
		retrainingHeaders:[
			{ text: 'Дата диплома', value: 'diplomDate', width:'1%'},
			{ text: 'О дипломе', value: 'about' },
			{ text: '', value: 'action', align:'center', width:320 },
			//{ text: 'Программа', value: 'course' },
			//{ text: 'Номер диплома', value: 'diplomNo' },
		]
	}),
	computed:{
		educationList(){
			const list = this.worker.educationList.slice()
			list.sort((a,b) => {
				if(a.diplomDate > b.diplomDate) return -1
				if(a.diplomDate < b.diplomDate) return 1
				return 0
			})
			return list
		},
		retrainingList(){
			const list = this.worker.retrainingList.slice()
			list.sort((a,b) => {
				if(a.diplomDate > b.diplomDate) return -1
				if(a.diplomDate < b.diplomDate) return 1
				return 0
			})
			return list
		},
		isGood(){
			let hasAnd = false
			let hasSpec = false
			this.worker.retrainingList.forEach(retr => {
				if(retr.type===1) hasSpec = true;
				else if(retr.type===2) hasAnd = true;
			});

			return hasAnd && hasSpec
		},
		processedText(){
			if(this.worker.processed==-1) return 'Пропущено'
			if(this.worker.processed==1) return 'Обработан'
			return '----'
		}
	},
	mounted(){
		this.uploadWorker()
	},
	beforeRouteUpdate(to, from, next){
		next()
		this.uploadWorker()
	},
	methods:{
		async uploadWorker(){
			const id = this.$route.params.ID
			const { data } = await api.get(`/workers/${id}`)
			this.worker = data.worker
		},
		dateHuman(d){
			return moment(d).format('DD.MM.YYYY')
		},
		typeChanged(item){
			this.worker.retrainingList.forEach(retr => {
				if(retr.type === item.type && retr.id != item.id){
					retr.type = 0
				}
			})
		},
		clickClear(){
			this.worker.retrainingList.forEach(retr => {
				retr.type = 0
			})
		},
		async saveTypes(){
			const params = {
				updates:[]
			}
			this.worker.retrainingList.forEach(retr => {
				params.updates.push({
					data:{
						type: retr.type
					},
					id:retr.id
				})
			})
			await api.put(`/retrainings/updates`,params);
			return true;
		},
		async clickCancel(){
			await this.saveTypes()
			await api.put(`/workers/${this.worker.id}`,{
				processed: -1
			})
			this.nextWorker()
		},
		async clickSave(){
			await this.saveTypes()
			await api.put(`/workers/${this.worker.id}`,{
				processed: 1
			})
			this.nextWorker()
		},
		async nextWorker(){
			const { data } = await api.get('/workers/next')
			this.$router.push(`/workers/${data.id}`)
		}
	},
}
</script>

<style>

</style>
