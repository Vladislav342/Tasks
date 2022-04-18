const Books = require('../db/models/books');
const valid = require('../db/helpers/validSchema');

class BooksController{
	async getBooks(){
		const books = await Books.query();
		return books;
	}

	async getOneBook(id){
		const obj = {
			iD: id
		}
		const {error, okey} = valid.schema2.validate(obj);
		if(error){
			return error.message;
		}else{
			const book = await Books.query().findById(id);
			return book;
		}	
	}

	async createBook(obj){
		const {error, okey} = valid.schema.validate(obj);
		if(error){
			return error.message;
		}else{
			let {id, author, title, year} = obj;
			let newBook = await Books.query().insert({id, author, title, year}).returning('id');
			return newBook;
		}
	}

	async deleteBook(id){
		const obj = {
			iD: id
		}
		const {error, okey} = valid.schema2.validate(obj);
		if(error){
			return error.message;
		}else{
			let book = await Books.query().findById(id).del();
			return book;
		}
	}

	async updateBook(i_d, obj){
		const obj2 = {
			iD: i_d
		};
		const {error, okey} = valid.schema.validate(obj);
		const {error2, okey2} = valid.schema2.validate(obj2);
		console.log(error2);
		if(error){
			throw error;
		}else if(error2){
			throw error2;
		}else{
			let {id, author, title, year} = obj;
			let book = await Books.query().findById(i_d).update({id, author, title, year});
			return book;
		}	
		
	}
}

module.exports = new BooksController();

