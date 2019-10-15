import { sequelize, Model, DataTypes } from '@helpers/db.mjs'

class JSWorker extends Model {}



JSWorker.init({
	name: DataTypes.STRING,
	post_text: DataTypes.STRING,
	post_id: DataTypes.INTEGER,
	subdivision_id: DataTypes.INTEGER,
	state: {
		type: DataTypes.INTEGER(4),
		defaultValue: 1
	}
}, {
	sequelize,
	modelName: 'workers'
});



export default JSWorker
