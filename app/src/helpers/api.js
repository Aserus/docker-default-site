import axios from 'axios';


const api = axios.create({
	baseURL: `${window.location.protocol}//${window.location.hostname}/api/`,
	timeout: 10000,
	//  headers: {'X-Custom-Header': 'foobar'}
});



export default api;
