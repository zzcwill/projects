var Sequelize = require('sequelize');
var { resDataApi } = require('../extend/api');
var { User } = require('../dba');
var uuid = require('uuid');

module.exports = {
	add: async function (req, res, next) {
		//增删改查-操作
		var data = await User.create({ 
		  user_name: 'zzc7',
		  phone: '18042434243',
		  salt: 'neirongzzc'
		});

		res.json(resDataApi(10000,data,'ok'))
	},
	delete: async function (req, res, next) {
		var data = await User.destroy({
			where: {
				user_name: 'zzc7'
			}
		})
		res.json(resDataApi(10000,data,'ok'));			
	},
	update: async function (req, res, next) {
		var data = await User.update(
			{ user_name:  'zzc-' + uuid.v1()}, 
			{
				where: {
					phone: '18042434282'
				}
			}
		)
		res.json(resDataApi(10000,data,'ok'));			
	},
	search: async function (req, res, next) {
		// var data = await User.findByPk(1)
		// var data2 = await User.findOne({ where: { phone: '18042434282' } })
		// console.info(data)
		// console.info(data2)

		var { count, rows } = await User.findAndCountAll({
			where: {
				user_name: {
					[Sequelize.Op.like]: 'z%'
				}
			},
			// offset: 2,
			// limit: 2
		});

		res.json(resDataApi(10000,{
			list: rows,
			total: count
		},'ok'));  
	}
}