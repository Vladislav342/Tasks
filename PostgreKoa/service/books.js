const db = require('../db');
	
class BooksController{
	async createBook(ctx){
		let {author, title, year} = ctx.request.body;
		const newBook = await db.query(`INSERT INTO library (author, title, year) values ($1, $2, $3) RETURNING *`, [author, title, year])
		ctx.body = newBook.rows[0];
	}

	async getBooks(ctx){
		let books = await db.query(`SELECT * FROM library`);
		console.log(JSON.stringify(books));
		ctx.body = "ready";
	}

	async addBook(ctx){

	}

	async updateBook(ctx){

	}

	async deleteBook(ctx){

	}
}

module.exports = new BooksController();