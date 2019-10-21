//import createError from 'http-errors'

import { JSWorkerEducation } from "@models/index.mjs";


export default async (fastify) => {

	///////////////////////////////
	fastify.get('/educations', async (req, res) => {
		const list = await JSWorkerEducation.scope('worker').findAll()
		return { list }
	})



}
