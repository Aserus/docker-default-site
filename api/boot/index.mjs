import path from 'path'
import AutoLoad from '@helpers/fastify-autoload'
import favicon from 'fastify-favicon';
import cors from 'fastify-cors'
import '@models/index.mjs'



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
