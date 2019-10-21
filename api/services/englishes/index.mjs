//import createError from 'http-errors'

import { JSWorkerEnglish } from "@models/index.mjs";

export default async (fastify) => {

	///////////////////////////////
	fastify.get('/englishes', async (req, res) => {
		const list = await JSWorkerEnglish.scope('worker').findAll()
		return { list }
	})



}
