import Fastify from 'fastify'

import bootFastify from './boot'
import nconf from '@config'

const fastify = Fastify({
	logger: {
		level: 'error',
	}
})



fastify.register(bootFastify)





const start = async () => {
	try {
		await fastify.listen(nconf.get('PORT') || 80, '0.0.0.0')
		//console.log('server start')
	} catch (err) {
		fastify.log.error(err)
		process.exit(1)
	}
}
start()
