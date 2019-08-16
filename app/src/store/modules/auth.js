import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT } from '@actions/auth'
import { USER_REQUEST } from '@actions/user'
import apiCall from '@helpers/api'

const state = { token: localStorage.getItem('user-token') || '', status: '', hasLoadedOnce: false }

const getters = {
	isAuthenticated: state => !!state.token,
	authStatus: state => state.status,
}

function setAuthHeader(token){
	apiCall.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

const actions = {
	[AUTH_REQUEST]: async ({commit, dispatch}, user) => {
		commit(AUTH_REQUEST)
		try{
			const { data } = await apiCall.post('/auth',user);
			localStorage.setItem('user-token', data.token);
			setAuthHeader(data.token)
			commit(AUTH_SUCCESS, data)
			dispatch(USER_REQUEST)
		}catch(err){
			commit(AUTH_ERROR, err)
			localStorage.removeItem('user-token')
			throw err;
		}
	},
	[AUTH_LOGOUT]: async ({commit}) => {
		commit(AUTH_LOGOUT)
		localStorage.removeItem('user-token')
	}
}

const mutations = {
	[AUTH_REQUEST]: (state) => {
		state.status = 'loading'
	},
	[AUTH_SUCCESS]: (state, resp) => {
		state.status = 'success'
		state.token = resp.token
		state.hasLoadedOnce = true
	},
	[AUTH_ERROR]: (state) => {
		state.status = 'error'
		state.hasLoadedOnce = true
	},
	[AUTH_LOGOUT]: (state) => {
		state.token = ''
	}
}

export default {
	state,
	getters,
	actions,
	mutations,
}
