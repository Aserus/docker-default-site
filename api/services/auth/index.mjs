import createError from 'http-errors'

import {
	JSUser,
} from '@models/index.mjs';



export default async (fastify) => {

	fastify.post('/auth',{
		schema: await import('./schemes/auth.json')
	},
	async (req, res) => {

		const { username,password } = req.body;
		console.log(username,password)

		const user = await JSUser.checkAuthData(username,password);
		if(!user) throw createError(401,'Bad username or password unf');
		const token = await res.authUser(user);
		return {token};
	})

}
