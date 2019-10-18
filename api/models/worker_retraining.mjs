import { sequelize, Model, DataTypes } from '@helpers/db.mjs'

class JSWorkerRetraining extends Model {}



JSWorkerRetraining.init({
	diplomNo: DataTypes.STRING,
	diplomDate: DataTypes.DATEONLY,
	institution: DataTypes.STRING,
	institution_id: DataTypes.INTEGER,
	course: DataTypes.STRING(900),
	program_id: DataTypes.INTEGER,
	worker_id: DataTypes.INTEGER,
	type: {
		type: DataTypes.INTEGER,
		defaultValue: 1
	},
	state: {
		type: DataTypes.INTEGER(4),
		defaultValue: 1
	}
}, {
	sequelize,
	modelName: 'worker_retraining',

	/*indexes: [
    {
      unique: true,
      fields: ['diplomNo','worker_id']
    },
	]
	*/
});



export default JSWorkerRetraining
