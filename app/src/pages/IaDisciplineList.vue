<template lang="pug">
page-content
	h3 Дисциплины
	v-data-table(:headers="headers"  :items="list"  :items-per-page="10")
</template>



<script>
export default {
	data: ()=>({
		headers: [
			{ text: 'ID', value: 'id', width:'1%', class:'text-truncate' },
			{ text: 'Название', value: 'name' },

		],
		list: []
	}),
}
</script>

<style>

</style>
