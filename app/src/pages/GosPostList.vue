<template lang="pug">
page-content
	v-card
		v-card-title Должности
			.flex-grow-1
			v-text-field(
				v-model="search"
				append-icon="search"
				label="Search"
				single-line
				hide-details)

		v-data-table(:headers="headers"  :items="list"  :items-per-page="10"  :search="search")
</template>



<script>
import data from '../_testdata/posts.json'


export default {
	data: ()=>({
		headers: [
			{ text: 'ID', value: 'id', width:'1%', class:'text-truncate' },
			{ text: 'Название', value: 'name' },
			{ text: 'Код', value: 'code', width:'1%' },

		],
		search:null,
		list: data
	}),
}
</script>

<style>

</style>
