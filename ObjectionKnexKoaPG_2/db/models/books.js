const {Model} = require('objection');

class Books extends Model{
	static get tableName(){
		return 'books';
	}
}

module.exports = Books;