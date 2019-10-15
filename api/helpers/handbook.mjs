import axios from 'axios'

import axiosCacheAdapter from 'axios-cache-adapter'

const { setupCache } = axiosCacheAdapter

// Create `axios-cache-adapter` instance
const cache = setupCache({
  maxAge: 15 * 60 * 1000
})


const api = axios.create({
	baseURL: `https://handbook.aeronav.aero/api/`,
	timeout: 10000,
	adapter: cache.adapter
	//  headers: {'X-Custom-Header': 'foobar'}
});


function listToAssoc(list){
	const assoc = {}
	list.forEach(item => {
		assoc[item.id] = item
	})
	return assoc
}


export async function GosSubdivisionList(){
	const { data } = await api.get('/gos/subdivisions')
	return data.list
}

export async function IaSubdivisionList(){
	const { data } = await api.get('/ia/subdivisions')
	return data.list
}

export async function GosPostList(){
	const { data } = await api.get('/gos/posts')
	return data.list
}


export async function GosPostAssoc(){
	const list = await GosPostList()
	return listToAssoc(list)
}
export async function IaSubdivisionAssoc(){
	const list = await IaSubdivisionList()
	return listToAssoc(list)
}
export async function GosSubdivisionAssoc(){
	const list = await GosSubdivisionList()
	return listToAssoc(list)
}




export default api;
