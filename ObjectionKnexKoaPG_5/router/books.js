const Router = require('koa-router');
const router = new Router();

const { validationSchemaForAuthor, validationSchemaForId, validationSchemaForObject } = require('./validSchema');

const obj = require('../service/books.js');

let validationMiddleware = require('./validationMiddleware');


router.get('/api/books', async (ctx) => {
	const books = await obj.getBooks();
	books.sort((a,b) => { return a.id - b.id});
	ctx.body = "<pre>"+JSON.stringify(books, null, 2)+"</pre>";
});

router.get('/api/book/:id', validationMiddleware('id', validationSchemaForId), async (ctx) => {
	const book = await obj.getOneBook(ctx.params.id);
	ctx.body = "<pre>"+JSON.stringify(book, null, 2)+"</pre>";
});

router.post('/api/books', validationMiddleware('request.body', validationSchemaForObject), async (ctx) => {
	let newBook = await obj.createBook(ctx.request.body);
	ctx.body = newBook;
});

router.delete('/api/book/:id', validationMiddleware('id', validationSchemaForId),  async (ctx) => {
	let delBook = await obj.deleteBook(ctx.params.id);
	ctx.body = "the book is deleted";
});

router.put('/api/book/:id', validationMiddleware('id', validationSchemaForId, 'request.body', validationSchemaForObject),  async (ctx) => {
	let upBook = await obj.updateBook(ctx.params.id, ctx.request.body);
	ctx.body = "the book is changed";
});

module.exports = router;