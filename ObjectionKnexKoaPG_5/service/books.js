//const Books = require('../db/models/books');

/*const BooksRepository = {
	findAll: async () => {
		return Books.query();
	},
	findOne: async (id) => {
		return Books.query().findById(id);
	},
	createOne: async (obj) => {
		return Books.query().insert({id, author, title, year}).returning('id');
	},
	deleteOne: async (id) => {
		return Books.query().findById(id).del();
	},
	updateOne: async (i_d, obj) => {
		return Books.query().findById(i_d).update(obj);
	}
}
*/

const BooksRepository = require('./booksRepository');

class BooksController{
	async getBooks(){
		const books = await BooksRepository.findAll();
		return books;
	}

	async getOneBook(id){
		const book = await BooksRepository.findOne(id);
		return book;
	}

	async createBook(obj){
		let {id, author, title, year} = obj;
		let newBook = await BooksRepository.createOne({id, author, title, year});
		return newBook;
	}

	async deleteBook(id){
		let book = await BooksRepository.deleteOne(id);
		return book;
	}

	async updateBook(i_d, obj){
		let {id, author, title, year} = obj;
		let book = await BooksRepository.updateOne(i_d, obj);
		return book;	
	}
}


module.exports = new BooksController();

