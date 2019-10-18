//import createError from 'http-errors'

import {
	IaSubdivisionList,
	GosPostList,
	IaProgramList
} from "@helpers/handbook.mjs";
//console.log(models)


export default async (fastify) => {

	///////////////////////////////
	fastify.get('/gos/posts', async (req, res) => {
		const list = await GosPostList()
		return { list }
	})
	///////////////////////////////
	fastify.get('/ia/subdivisions', async (req, res) => {
		const list = await IaSubdivisionList()
		return { list }
	})
	///////////////////////////////
	fastify.get('/ia/programs', async (req, res) => {
		const list = await IaProgramList()
		return { list }
	})



}
