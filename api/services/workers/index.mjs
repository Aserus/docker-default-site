import createError from 'http-errors'

import {
	JSWorker,
	JSWorkerEducation,
	JSWorkerEnglish,
	JSWorkerRetraining,
	Op
} from "@models/index.mjs";



import {
	GosSubdivisionAssoc,
	IaSubdivisionAssoc
} from "@helpers/handbook.mjs";


async function promiseObj(obj){
	const result = await Promise.all(Object.values(obj))
	const out = {};
	Object.keys(obj).forEach((key,i) => {
		out[key] = result[i]
	});
	return out;
}


export default async (fastify) => {

	///////////////////////////////
	fastify.get('/workers', async (req, res) => {
		const list = await JSWorker.findAll()
		return { list }
	})


	fastify.get('/workers/free',{
		preValidation: [ fastify.checkFullAccess ],
	}, async (req, res) => {
		if(!req.user.last_worker_id){
			const worker = await JSWorker.findFree()
			req.user.update({
				last_worker_id: worker.id
			})
		}

		return { id:req.user.last_worker_id }
	})

	fastify.get('/workers/next',{
		preValidation: [ fastify.checkFullAccess ],
	}, async (req, res) => {
		const worker = await JSWorker.findFree()
		req.user.update({
			last_worker_id: worker.id
		})
		return { id:worker.id }
	})

	fastify.get('/workers/:ID', async (req, res) => {
		const worker = await JSWorker.findByPk(req.params.ID)

		const out = JSON.parse(JSON.stringify(worker))
		const worker_id = worker.id
		const where = { worker_id }

		const promObjHb = {
			gosSubdAssoc: GosSubdivisionAssoc(),
			iaSubdAssoc: IaSubdivisionAssoc()
		}
		const handbook = await promiseObj(promObjHb)


		if(out.subdivision_id && handbook.gosSubdAssoc[out.subdivision_id]){
			out.subdivisionText = handbook.gosSubdAssoc[out.subdivision_id].name
		}


		const retrWhere = {
			worker_id,
			diplomDate:{
				[Op.gte]: '2013-01-01'
			}
		}


		const promObj = {
			educationList: JSWorkerEducation.findAll({ where }),
			retrainingList: JSWorkerRetraining.findAll({ where:retrWhere }),
			englishList: JSWorkerEnglish.findAll({ where })
		}

		const result = await promiseObj(promObj)

		Object.assign(out,result);


		if(out.retrainingList && out.retrainingList.length){
			out.retrainingList = JSON.parse(JSON.stringify(out.retrainingList))
			out.retrainingList.forEach(item => {

				if(item.institution_id && handbook.iaSubdAssoc[item.institution_id]){
					const subd = handbook.iaSubdAssoc[item.institution_id]
					item.institutionText = `${subd.name} (г.${subd.city})`
				}
			})
		}



		return { worker:out }
	})




	fastify.put('/workers/:ID',{
		preValidation: [ fastify.checkFullAccess ],
	}, async (req, res) => {
		const item = await JSWorker.findByPk(req.params.ID)
		if(!item) throw createError(404,'Сотрудник не найден')

		const body = req.body
		const params = {};

		if(body.state){
			params.state = req.body.state
		}

		if(body.processed){
			params.processed = body.processed
		}

		await item.update(params)

		return {id: item.id}
	})

}
