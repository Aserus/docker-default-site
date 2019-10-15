import { sequelize, Model, DataTypes } from '@helpers/db.mjs'

class JSWorkerRetraining extends Model {}



JSWorkerRetraining.init({
	diplomNo: DataTypes.STRING,
	diplomDate: DataTypes.DATEONLY,
	institution: DataTypes.STRING,
	course: DataTypes.STRING(900),
	worker_id: DataTypes.INTEGER,
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
