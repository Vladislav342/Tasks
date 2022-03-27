const db = require('../db');
	
class BooksController{
	async createBook(ctx){
		let {author, title, year} = ctx.request.body;
		const newBook = await db.query(`INSERT INTO library (author, title, year) values ($1, $2, $3) RETURNING *`, [author, title, year])
		ctx.body = newBook.rows[0];
	}

	async getBooks(ctx){
		let books = await db.query(`SELECT * FROM library`);
		console.log(books.rows);
		ctx.body = books.rows;
	}

	async getOneBook(ctx){
		let id = ctx.params.id;
		const book = await db.query(`SELECT * FROM library where id  = $1`, [id]);
		ctx.body = book.rows;
	}

	async updateBook(ctx){
		const {id, author, title, year} = ctx.request.body;
		const book = await db.query(`UPDATE library set author = $1, title = $2, year = $3 where id = $4 RETURNING *`,
			[author, title, year, id]);
		ctx.body = book.rows;
	}

	async deleteBook(ctx){
		const id = ctx.params.id;
		console.log(id);
		const book = await db.query(`DELETE FROM library where id = $1`, [id]);
		ctx.body = `The book's number - ${id} - is deleted`;
	}
}

module.exports = new BooksController();