const Router = require('koa-router')
const router = new Router();

const obj = require('../service/books.js');

router.get('/api/books', async (ctx) => {
	const books = await obj.getBooks();
	ctx.body = "<pre>"+JSON.stringify(books, null, 2)+"</pre>";
});

router.get('/api/book/:id', async (ctx) => {
	const book = await obj.getOneBook(ctx.params.id);
	ctx.body = "<pre>"+JSON.stringify(book, null, 2)+"</pre>";
});

router.post('/api/books', async (ctx) => {
	let newBook = await obj.createBook(ctx.request.body);
	ctx.body = newBook;
});

router.delete('/api/book/:id',  async (ctx) => {
	let delBook = await obj.deleteBook(ctx.params.id);
	ctx.body = "<pre>"+JSON.stringify(delBook, null, 2)+"</pre>";
});

router.put('/api/book/:id',  async (ctx) => {
	try{
		let upBook = await obj.updateBook(ctx.params.id, ctx.request.body);
		console.log('upbook', upBook);
		ctx.body = "<pre>"+JSON.stringify(upBook, null, 2)+"</pre>";
	}catch(err){
		console.log("error",err);
		ctx.body = err.message;
	}
	
});

module.exports = router;