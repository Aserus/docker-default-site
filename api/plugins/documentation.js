import fp from 'fastify-plugin'
import swagger from 'fastify-swagger';

export default fp(async (fastify) => {

	fastify.get('/', (req, res) => {
		res.type('text/html').send(`<a href="/documentation">Documentation</a>`)
	})

	fastify.register(swagger, {
		swagger: {
			info: {
				title: 'Doc API',
				description: 'description api',
				version: '0.1.0'
			},
			host: 'localhost',
			schemes: ['http'],
			consumes: ['application/json'],
			produces: ['application/json'],
			tags: [
			],
		},
		exposeRoute: true
	})

	fastify.ready(err => {
		if (err) throw err
		fastify.swagger()
	})


})
