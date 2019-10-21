import bcrypt from 'bcryptjs';
import { sequelize, Model, DataTypes } from '@helpers/db.mjs'


////////////////////////////////////////

async function hashPassword(password) {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(String(password), salt);
}


////////////////////////////////////////

class JSUser extends Model {}


JSUser.init({
	email:							{	type: DataTypes.STRING,	unique: true	},
	login:							{	type: DataTypes.STRING,	unique: true	},
	full_name:					{	type: DataTypes.STRING(300)	},
	short_name:					{	type: DataTypes.STRING	},
	first_name:					{	type: DataTypes.STRING	},
	second_name:				{	type: DataTypes.STRING	},
	middle_name:				{	type: DataTypes.STRING	},
	language:						{	type: DataTypes.STRING(10)	},
	comment:						{	type: DataTypes.TEXT	},
	last_worker_id:				{	type: DataTypes.INTEGER	},
	password_hash:			{	type: DataTypes.STRING	},
	role:								{	type: DataTypes.INTEGER,	defaultValue:0	},
	state: 							{	type: DataTypes.INTEGER(4), defaultValue:1, allowNull:false	},

	display_name: {
		type: DataTypes.VIRTUAL,
		get() { return this.short_name || this.login;	}
	},
	password: {
		type: DataTypes.VIRTUAL,
		validate: {
			isLongEnough: function (val) {
				if (val.length < 6) throw new Error('LG_ERROR_MODEL_USER_PASSWORD_LONGER_ENOUGH')
			}
		}
	},

}, {
	sequelize,
	modelName: 'users',
	defaultScope: {
		attributes:['id','login','email','full_name','last_worker_id']
	},
	scopes:{
		auth:{
			attributes:['id','login','email','full_name','last_worker_id','password_hash']
		}
	}
});


JSUser.beforeSave(async (user) => {
	let nameArr = [];

	if (user.second_name) nameArr.push(user.second_name);
	if (user.first_name) nameArr.push(user.first_name);
	if (user.middle_name) nameArr.push(user.middle_name);

	if(nameArr.length){
		user.full_name = nameArr.join(' ');
		nameArr[0] = nameArr[0]+' ';
		for(let i=1;i<nameArr.length;i++) nameArr[i] = nameArr[i].charAt(0)+'.'
		user.short_name = nameArr.join('');
	}

	if(user.password) user.password_hash = await hashPassword(user.password);

	return;
});



JSUser.checkAuthData = async (username,password) => {
	if(!username) return null;
	const where = {};
	if(username.indexOf('@')>0){
		where.email = username;
	}else{
		where.login = username;
	}
	const user = await JSUser.scope('auth').findOne({where})
	if(!user) return null;
	const check = await user.comparePassword(password);
	if (!check) return null;
	return user;
}

////////////////////////////////////////

JSUser.prototype.comparePassword 	= async function(pwd){
	if(!this.password_hash) return false;
	return await bcrypt.compare(pwd, this.password_hash);
}

JSUser.prototype.getLink 	= function(path){	return `/users/${this.hashid}/` + (path ? path : '');	}
JSUser.prototype.isAdmin 	= function(){	return this.role===1 ? true : false;	}


JSUser.sync({force:true}).then(()=>{
	return JSUser.create({
		login:'admin',
		password:'Adminwork1',
	})
})
.then(()=>{
	return JSUser.create({
		login:'user1',
		password:'661Inst',
	})
})
.then(()=>{
	return JSUser.create({
		login:'user2',
		password:'443Inst',
	})
})
.then(()=>{
	return JSUser.create({
		login:'user3',
		password:'641Inst',
	})
})

export default JSUser;
