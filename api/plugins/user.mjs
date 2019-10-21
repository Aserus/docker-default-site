import fp from 'fastify-plugin'

//import createError from 'http-errors'

import { JSUser } from '@models/index.mjs';


export default fp(async (fastify) => {

	/*
	fastify.decorateRequest('userGroupIds',  function(){
		if(this._userGroupIds) return this._userGroupIds
		this._userGroupIds = JSUser.groupsIds(this.user.id);
		return this._userGroupIds
	})


	JSUser.findByPk(28).then(user=> {
		return user.update({password:111})
	})
	JSUser.findByPk(71).then(user=> {
		return user.update({password:111})
	})

	*/


})
