import fp from 'fastify-plugin'
import { promises as fs } from 'fs'
import path from 'path'


export default fp((fastify, opts, next) => {
	const defaultPluginOptions = opts.options

	async function autoload(){
		const list = await fs.readdir(opts.dir)

		const promArr = list.map(async file => {
			const toLoad = path.join(opts.dir, file)
			const stat = await fs.stat(toLoad);
			const out = {file: toLoad}
			if (stat.isDirectory()) {
				const files = await fs.readdir(toLoad);
				out.skip = files.every(name => !name.match(/.mjs$/))
			} else {
				out.skip = !(stat.isFile() && file.match(/.mjs$/))
			}
			return out;
		})

		const stats = await Promise.all(promArr);

		for (let i = 0; i < stats.length; i++) {
			const { skip, file } = stats[i]

			if (skip) continue

			try {

				const pluginModule = await import(file);
				const pluginOptions = Object.assign({}, defaultPluginOptions)

				if (pluginModule.autoPrefix) {
					const prefix = pluginOptions.prefix || ''
					pluginOptions.prefix = prefix + pluginModule.autoPrefix
				}
				if (pluginModule.prefixOverride !== void 0) {
					pluginOptions.prefix = pluginModule.prefixOverride
				}

				if (pluginModule.autoload !== false) {
					fastify.register(pluginModule.default ? pluginModule.default : pluginModule, pluginOptions)
				}
			} catch (err) {
				if (err instanceof SyntaxError) {
					err.message += ' at ' + err.stack.split('\n')[0]
				}
				throw err
			}
		}
	}

	autoload()
		.then(()=>next())
		.catch(next)
})
