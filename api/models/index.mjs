import JSWorker from './worker.mjs'
import JSWorkerEducation from './worker_education.mjs'
import JSWorkerRetraining from './worker_retraining.mjs'
import JSWorkerEnglish from './worker_english.mjs'
import JSUser from './user.mjs'
import sequelize from 'sequelize';
const { Op } = sequelize






const belongsTo = (cl1,cl2,k)	=>	cl1.belongsTo(cl2, {as: k,foreignKey: k.toLowerCase()+'_id',});



belongsTo(JSWorkerRetraining,	JSWorker,'Worker');
belongsTo(JSWorkerEducation,	JSWorker,'Worker');
belongsTo(JSWorkerEnglish,	JSWorker,'Worker');



JSWorkerRetraining.addScope('worker',{
	include: [
		{ association: 'Worker', required: false},
	]
});

JSWorkerEducation.addScope('worker',{
	include: [
		{ association: 'Worker', required: false},
	]
});

JSWorkerEnglish.addScope('worker',{
	include: [
		{ association: 'Worker', required: false},
	]
});



const models = {
	JSWorker,
	JSWorkerEducation,
	JSWorkerRetraining,
	JSWorkerEnglish,
	JSUser,
}



export {
	JSWorker,
	JSWorkerEducation,
	JSWorkerRetraining,
	JSWorkerEnglish,
	JSUser,
	Op,
//	sequelize
}

export default models
