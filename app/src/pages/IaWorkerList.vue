<template lang="pug">
page-content
	h3 Сотрудники
	v-data-table(:headers="headers"  :items="list"  :items-per-page="10")
</template>



<script>
import data from '../_testdata/workers.json'


export default {
	data: ()=>({
		headers: [
			{ text: 'ID', value: 'id', width:'1%', class:'text-truncate' },
			{ text: 'Фамилия', value: 'first_name' },
			{ text: 'Имя', value: 'second_name' },
			{ text: 'Отчество', value: 'middle_name' },
			{ text: 'Телефон', value: 'phone' },
			{ text: 'Email', value: 'email' },

		],
		list: data
	}),
}
</script>

<style>

</style>
