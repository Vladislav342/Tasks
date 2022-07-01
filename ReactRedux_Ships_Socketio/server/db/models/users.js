const {Model} = require('objection');

class Users extends Model{
	static get tableName(){
		return 'users_table2';
	}
}

module.exports = Users;