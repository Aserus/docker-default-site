//import createError from 'http-errors'


import models from "@models/index.mjs";
//console.log(models)

export default async (fastify) => {

	///////////////////////////////
	fastify.get('/hello', async (req, res) => {
		const message = 'Hello world'
		return { message }
	})



}
