import Vue from 'vue'

import { USER_REQUEST, USER_ERROR, USER_SUCCESS } from '@actions/user'
import apiCall from '@helpers/api'

import { AUTH_LOGOUT } from '@actions/auth'

const state = { status: '', profile: {} }

const getters = {
	userProfile: state => state.profile,
	isProfileLoaded: state => !!state.profile.id,
	isAdmin: state => ((state.profile && state.profile.role) ? true : false)
}

const actions = {
	[USER_REQUEST]: async ({commit, dispatch}) => {
		commit(USER_REQUEST)
		try{
			const { data } = await apiCall.get('users/current')
			commit(USER_SUCCESS, data.user)
		}catch(err){
			commit(USER_ERROR)
			dispatch(AUTH_LOGOUT)
		}
	},
}

const mutations = {
	[USER_REQUEST]: (state) => {
		state.status = 'loading'
	},
	[USER_SUCCESS]: (state, user) => {
		state.status = 'success'
		Vue.set(state, 'profile', user)
	},
	[USER_ERROR]: (state) => {
		state.status = 'error'
	},
	[AUTH_LOGOUT]: (state) => {
		state.profile = {}
	}
}

export default {
	state,
	getters,
	actions,
	mutations,
}
