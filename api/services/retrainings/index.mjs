import createError from 'http-errors'

import { JSWorkerRetraining, Op } from "@models/index.mjs";
import { GosSubdivisionAssoc,GosPostAssoc } from "@helpers/handbook.mjs";

//console.log(models)

export default async (fastify) => {

	///////////////////////////////
	fastify.get('/retrainings', async (req, res) => {
		const postAssoc = await GosPostAssoc()
		const subdAssoc = await GosSubdivisionAssoc()


		const limit = req.query.limit ? Number(req.query.limit) : 100


		const where = {
			state:1,
		}
		if(req.query.search){
			const search = JSON.parse(req.query.search)

			for(let key in search){
				const s = search[key]
				if(s instanceof Array){
					where[key] = s
				}else if(typeof(s) =='object' && s.operator == '='){
					where[key] = s.value
				}else if(typeof(s) =='object' && s.operator == '<>'){


					where[key] = {
						[Op.ne]: s.value
					}

				}else if(typeof(s) =='object' && s.operator == '>'){
					where[key] = {
						[Op.gt]: s.value
					}

				}else{
					where[key] = s
				}

			}


			console.log(search)
		}





		const tmpList = await JSWorkerRetraining.scope('worker').findAll({
			where,
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



	fastify.delete('/retrainings/:ID', async (req, res) => {
		const item = await JSWorkerRetraining.findByPk(req.params.ID)
		if(!item) throw createError(404,'Кпк не найден')

		await item.update({state:0})

		return {id: item.id}
	})

	fastify.put('/retrainings/:ID', async (req, res) => {
		const item = await JSWorkerRetraining.findByPk(req.params.ID)
		if(!item) throw createError(404,'Кпк не найден')

		const body = req.body
		const params = {};

		if(body.state){
			params.state = req.body.state
		}
		if(typeof body.institution_id !== 'undefined' ){
			params.institution_id = body.institution_id
		}
		if(body.program_id){
			params.program_id = body.program_id
		}


		if(req.body.editAll){
			await JSWorkerRetraining.update({
				institution_id: req.body.institution_id
			},
			{
				where:{
					institution: item.institution,
					state:1
				}
			})
		}


		//console.log(req.body)

		await item.update(params)

		return {id: item.id}
	})

	fastify.put('/retrainings', async (req, res) => {
		if(!req.body.ids) throw createError(400,'Ошибка параметров')
		if(typeof req.body.institution_id === 'undefined' ){
			throw createError(400,'Ошибка параметров организации')
		}

		await JSWorkerRetraining.update({
			institution_id: req.body.institution_id,
			//updatedAt: sequelize.fn('NOW')
		},
		{
			where:{
				id: req.body.ids
			}
		})


		return { sucess: 1 }
	})

	fastify.put('/retrainings/updates', async (req, res) => {
		if(!req.body.updates) throw createError(400,'Ошибка параметров')


		for(let upd of req.body.updates){
			await JSWorkerRetraining.update(upd.data,
			{
				where:{
					id: upd.id
				}
			})

		}


		return { sucess: 1 }
	})


}
