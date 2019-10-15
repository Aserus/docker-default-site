import { sequelize, Model, DataTypes } from '@helpers/db.mjs'


class JSWorkerEnglish extends Model {}



JSWorkerEnglish.init({
	certNo: DataTypes.STRING,
	certDate: DataTypes.DATEONLY,
	testerText: DataTypes.STRING,
	testText: DataTypes.STRING,
	icaoLevel: DataTypes.INTEGER,
	worker_id: DataTypes.INTEGER,
	state: {
		type: DataTypes.INTEGER(4),
		defaultValue: 1
	}
}, {
	sequelize,
	modelName: 'worker_english',

	/*indexes: [
    {
      unique: true,
      fields: ['diplomNo','worker_id']
    },
	]
	*/
});



export default JSWorkerEnglish
