const dbSetup = require('../db/db-setup');
const Books = require('../db/models/books');
dbSetup();

class BooksController{
	async getBooks(ctx){
		const books = await Books.query();
		ctx.body = "<pre>"+JSON.stringify(books, null, 2)+"</pre>";
	}

	async getOneBook(ctx){
		let id = ctx.params.id;
		const book = await Books.query().findById(id);
		ctx.body = "<pre>"+JSON.stringify(book, null, 2)+"</pre>";
	}

	async createBook(ctx){
		let {id, author, title, year} = ctx.request.body;
		let newBook = await Books.query().insert({id, author, title, year}).returning('id');
		ctx.body = newBook;
	}

	async deleteBook(ctx){
		const id = ctx.params.id;
		let book = await Books.query().findById(id).del();
		ctx.body = 'the book is deleted';
	}

	async updateBook(ctx){
		const i_d = ctx.params.id;
		let {id, author, title, year} = ctx.request.body;
		let book = await Books.query().findById(i_d).update({id, author, title, year});
		ctx.body = 'the book is updated';
	}
}

module.exports = new BooksController();

