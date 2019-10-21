//import createError from 'http-errors'
import { JSUser } from '@models/index.mjs';
//import JSGroup from '@models/group.mjs';

export default async (fastify) => {

	///////////////////////////////
	fastify.get('/users/current',{
		preValidation: [fastify.checkAccess],
		schema: {
			summary: 'current user',
			tags: ['user'],
		}
	}, async (req, res) => {
		const user = await JSUser.findByPk(req.user.id)
		return { user }
	})


	///////////////////////////////
	fastify.get('/users',{
		preValidation: [fastify.checkAccess],
		schema: {
			summary: 'user list',
			tags: ['user'],
		}
	}, async (req, res) => {

		const list = await JSUser.findAll()
		return { list }
	})

	///////////////////////////////
	fastify.post('/users', {
		preValidation: [fastify.checkAccess],
		schema: {
			summary: 'Create new user',
			tags: ['user'],
		}

	}, async (req, res) => {
		//console.log(req.params)
		return {success:1};
	})




}
