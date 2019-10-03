<template lang="pug">
page-content
	h3 Программы
	v-data-table(:headers="headers"  :items="list"  :items-per-page="10")
</template>



<script>
import data from '../_testdata/programs.json'


export default {
	data: ()=>({
		headers: [
			{ text: 'ID', value: 'id', width:'1%', class:'text-truncate' },
			{ text: 'Название', value: 'name' },
			{ text: 'Код', value: 'code', width:'1%' },
			{ text: 'Кол-во часов', value: 'count_hours' },
			{ text: 'Кол-во дней', value: 'count_days' },

		],
		list: data
	}),
}
</script>

<style>

</style>
