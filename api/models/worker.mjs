import { sequelize, Model, DataTypes } from '@helpers/db.mjs'

class JSWorker extends Model {}



JSWorker.init({
	name: DataTypes.STRING,
	post_text: DataTypes.STRING,
	post_id: DataTypes.INTEGER,
	subdivision_id: DataTypes.INTEGER,
	processed:{
		type: DataTypes.INTEGER,
		defaultValue: 0
	},
	state: {
		type: DataTypes.INTEGER(4),
		defaultValue: 1
	}
}, {
	sequelize,
	modelName: 'workers'
});



JSWorker.findFree = async function(){

	const strQuery = `SELECT wr.worker_id as id FROM worker_retrainings as wr
		LEFT JOIN workers as w ON w.id = wr.worker_id
		WHERE
		wr.diplomDate >= '2013-01-01' AND w.processed = 0
		GROUP BY worker_id
		ORDER BY RAND()
		LIMIT 1`

	const results = await sequelize.query(strQuery)
	if(results.length ==0 ) return null;
	if(results[0].length ==0 ) return null;
	if(!results[0][0].id) return null;
	const id = results[0][0].id
	return await JSWorker.findByPk(id)
}
JSWorker.findFree().then(console.log)

export default JSWorker
