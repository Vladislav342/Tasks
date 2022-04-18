const Books = require('../db/models/books');


class BooksController{
	async getBooks(){
		const books = await Books.query();
		return books;
	}

	async getOneBook(id){
		const book = await Books.query().findById(id);
		return book;
	}

	async createBook(obj){
		let {id, author, title, year} = obj;
		let newBook = await Books.query().insert({id, author, title, year}).returning('id');
		return newBook;
	}

	async deleteBook(id){
		let book = await Books.query().findById(id).del();
		return book;
	}

	async updateBook(i_d, obj){
		let {id, author, title, year} = obj;
		let book = await Books.query().findById(i_d).update({id, author, title, year});
		return book;	
	}
}


module.exports = new BooksController();

