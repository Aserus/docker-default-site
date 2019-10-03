<template lang="pug">
page-content
	h3 Филиалы
	//v-data-table(:headers="headers"  :items="list"  :items-per-page="10")
	v-treeview(:items="tree")
</template>



<script>
//import data from '../_testdata/gossubdivisions.json'
import dataSource from '../_testdata/ex.divisions.json'

const data = JSON.parse(JSON.stringify(dataSource))

const assoc = {}
data.forEach(item => assoc[item.code]=item)

data.forEach(item => {
	item.name = item.title;
	if(item.superior){
		const parent = assoc[item.superior]
		if(parent){
			if(!parent.children) parent.children = []

			parent.children.push(item)
			//item.parent_title = assoc[item.parent_ext_code].title
		}
	}
})


data.forEach(item => {
	if(item.children){
		item.children.sort((a,b)=>{
			if(a.children && b.children) {
				if(a.title > b.title) return 1
				if(a.title < b.title) return -1
				return 0
			}
			if(a.children) return 1
			if(b.children) return -1

			if(a.title > b.title) return 1
			if(a.title < b.title) return -1
			return 0
		})

	}

})

const startTree = assoc["0001"].children




export default {
	data: ()=>({
		headers: [
			//{ text: 'ID', value: 'id', width:'1%', class:'text-truncate' },
			{ text: 'Code', value: 'ext_code', width:'1%', class:'text-truncate' },
			{ text: 'Название', value: 'title' },
			{ text: 'Название', value: 'parent_title' },

		],
		//list: data,
		tree:startTree
	}),
}
</script>

<style>

</style>
