//import createError from 'http-errors'

import { JSWorkerRetraining } from "@models/index.mjs";
import { GosSubdivisionAssoc,GosPostAssoc } from "@helpers/handbook.mjs";
//console.log(models)

export default async (fastify) => {

	///////////////////////////////
	fastify.get('/retrainings', async (req, res) => {
		const postAssoc = await GosPostAssoc()
		const subdAssoc = await GosSubdivisionAssoc()


		const limit = req.query.limit ? Number(req.query.limit) : 100

		const tmpList = await JSWorkerRetraining.scope('worker').findAll({
			limit
		})


		const list = tmpList.map(obj => {
			const item = obj.toJSON();
			item._worker_post_text_1 = 0
			if(!item.Worker) return
			item._worker_post_text_1 = 1
			if(item.Worker.post_id && postAssoc[item.Worker.post_id]){
				item._worker_post_text = postAssoc[item.Worker.post_id].name

			}
			if(item.Worker.subdivision_id && subdAssoc[item.Worker.subdivision_id]){
				item._worker_subdivision_text = subdAssoc[item.Worker.subdivision_id].name
			}
			return item
		})

		return { list }
	})



}
