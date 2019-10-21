import fp from 'fastify-plugin'
import jwt from 'fastify-jwt'
import nconf from '@config'

import createError from 'http-errors'

import { JSUser } from '@models/index.mjs';


export default fp(async (fastify) => {
	fastify.register(jwt, {
		secret: nconf.get('NODE_JWT_SECRET')
	})

	fastify.addHook("onRequest", async (req, res) => {
		try {
			await req.jwtVerify()
		}catch{
			true
		}
	})

	fastify.decorate("checkAccess", async (req, res) => {
		if(!req.user) res.send(createError(401,'Unauthorized'))
	})

	fastify.decorate("checkFullAccess", async (req, res) => {
		if(!req.user) res.send(createError(401,'Unauthorized'))
		const user =  await JSUser.findByPk(req.user.id)
		req.user = user
	})

	fastify.decorate("userInfo", async (req, res) => {
		const fullUser =  await JSUser.findByPk(req.user.id)
		req.user = fullUser
	})


	fastify.decorateReply('authUser', async function(user){
		const token = await this.jwtSign({ id:user.id })
		return token
	})
})
