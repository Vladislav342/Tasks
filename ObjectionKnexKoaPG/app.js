const dbSetup = require('./db/db-setup');
const Books = require('./db/models/books');

const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static');

dbSetup();

const koaBody = require('koa-body');
//const router = require('./router/books.js');

const Router = require('koa-router')
const router = new Router();

app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods());

router.get('/api/books', async (ctx) => {
	const books = await Books.query();
	//console.log(books);
	ctx.body = "<pre>"+JSON.stringify(books, null, 2)+"</pre>";
})

router.get('/api/book/:id', async (ctx) => {
	let id = ctx.params.id;
	//console.log(id);
	const book = await Books.query().findById(id);
	//console.log(book);
	ctx.body = "<pre>"+JSON.stringify(book, null, 2)+"</pre>";
});

router.post('/api/books', async (ctx) => {
	let {id, author, title, year} = ctx.request.body;
	let newBook = await Books.query().insert({id, author, title, year}).returning('id');
	ctx.body = newBook;
});

router.delete('/api/book/:id', async (ctx) => {
	const id = ctx.params.id;
	let book = await Books.query().findById(id).del();
	ctx.body = 'the book is deleted';
});

router.put('/api/book/:id', async (ctx) => {
	const i_d = ctx.params.id;
	let {id, author, title, year} = ctx.request.body;
	let book = await Books.query().findById(i_d).update({id, author, title, year});
	console.log(book);
	ctx.body = 'hello';
})

app.use(async (ctx) => {
	ctx.body = '<h1 style="text-align:center">The library of books</h1>';
});

app.listen(4000, () => {
	console.log('server is ready');
});