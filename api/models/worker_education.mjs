import { sequelize, Model, DataTypes } from '@helpers/db.mjs'

class JSWorkerEdication extends Model {}



JSWorkerEdication.init({
	level: DataTypes.STRING,
	diplomNo: DataTypes.STRING,
	diplomDate: DataTypes.DATEONLY,
	institution: DataTypes.STRING,
	worker_id: DataTypes.INTEGER,
	state: {
		type: DataTypes.INTEGER(4),
		defaultValue: 1
	}
}, {
	sequelize,
	modelName: 'worker_educations',

	/*indexes: [
    {
      unique: true,
      fields: ['diplomNo','worker_id']
    },
	]
	*/
});



export default JSWorkerEdication
