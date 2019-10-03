<template lang="pug">
page-content
	h3 Центры ОВД
	v-data-table(:headers="headers"  :items="list"  :items-per-page="10")
</template>



<script>
import data from '../_testdata/airplane.json'



export default {
	data: ()=>({
		headers: [
      { text: 'ID', value: 'id', width:'1%', class:'text-truncate' },
      { text: 'Название', value: 'name' },

    ],
		list: data
	}),
}
</script>

<style>

</style>
