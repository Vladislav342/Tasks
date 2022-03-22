const Router = require('koa-router');
const router = new Router();

const Task = require('../service/books.js');

router.get('/books', async (ctx) => {
  	ctx.body = JSON.stringify(await Task.openFile(), null, 2);
})

router.get('/book/:id', async (ctx) => {
	let id = ctx.params.id;
	let obj = await Task.openFile();
	let bookID = obj[id];
	ctx.body = JSON.stringify(bookID, null, 2);
})

router.post('/books', async (ctx) => {
	let req = ctx.request.body;
	let method = ctx.method;         
	let newBook =  await Task.cikle(req, method).then(result => {
		return result;
	});
	ctx.body = newBook;
})

router.put('/book/:id', async (ctx) => {
	let req = ctx.request.body;
	let method = ctx.method; 
	let newBook = await Task.cikle(req, method).then(result => {
		return result;
	});
	ctx.body = newBook;
})

router.delete('/books/:id', async (ctx) => {
	let id = Number(ctx.params.id) ;
	let books = await Task.openFile();           
	let index = Task.cikle2(books, id);
	ctx.body = index;
})

module.exports = router;