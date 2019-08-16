//import createError from 'http-errors'

export default async (fastify) => {

	///////////////////////////////
	fastify.get('/hello', async (req, res) => {
		const message = 'Hello world'
		return { message }
	})



}
