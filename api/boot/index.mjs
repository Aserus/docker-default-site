import path from 'path'
import AutoLoad from '@helpers/fastify-autoload'
import swagger from 'fastify-swagger';
import favicon from 'fastify-favicon';
import cors from 'fastify-cors'


export default (fastify, opts, next) => {

	fastify.register(favicon)

	fastify.register(cors, { origin: '*',credentials:true })


	fastify.setNotFoundHandler(async (req, reply) => {
		reply.header('Access-Control-Allow-Origin', '*')
		reply.header('Access-Control-Allow-Credentials', true)
		reply.code(404)
		return {
			statusCode: 404,
			error:		"Not Found",
			message:	"Функция не найдена"
		}
	})

	fastify.get('/', (req, res) => {
		res.type('text/html').send(`<a href="/documentation">Documentation</a>`)
	})


	fastify.register(swagger, {
		swagger: {
			info: {
				title: 'Default API',
				description: 'testing the fastify swagger api',
				version: '0.1.0'
			},
			host: 'localhost',
			schemes: ['http'],
			consumes: ['application/json'],
			produces: ['application/json'],
			tags: [ ],
		},
		exposeRoute: true
	})




	fastify.ready(err => {
		if (err) throw err
		fastify.swagger()
	})

	const rootPath = process.cwd();

  fastify.register(AutoLoad, {
    dir: path.join(rootPath, 'plugins'),
    options: Object.assign({}, opts)
  })


  fastify.register(AutoLoad, {
    dir: path.join(rootPath, 'services'),
    options: Object.assign({prefix:'/api'}, opts),
  })

  next()
}
