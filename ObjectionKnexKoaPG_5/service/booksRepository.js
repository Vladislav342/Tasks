const Books = require('../db/models/books');

class BooksRepository{
	async findAll(){
		return Books.query();
	}

	async findOne(id){
		return Books.query().findById(id);
	}

	async createOne(obj){
		return Books.query().insert({id, author, title, year}).returning('id');
	}

	async deleteOne(id){
		return Books.query().findById(id).del();
	}

	async updateOne(i_d, obj){
		return Books.query().findById(i_d).update(obj);
	}
}

module.exports = new BooksRepository();