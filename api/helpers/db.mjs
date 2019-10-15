import Sequelize from 'sequelize';
import nconf from '@config'



const connectUrl = `mysql://`+
	nconf.get('MYSQL_USER')+`:`+
	nconf.get('MYSQL_PASSWORD')+`@`+nconf.get('NODE_DB_HOST')+`:`+
	nconf.get('NODE_DB_PORT')+`/`+nconf.get('MYSQL_DATABASE')

const sequelize = new Sequelize(connectUrl,{
	//dialectOptions: {	timezone	},
	timezone:'+00:00',
	logging: false
});


const models = {}

export {
	Sequelize,
	sequelize,
	models
};

export const Model = Sequelize.Model
export const DataTypes = Sequelize.DataTypes



export default sequelize;
