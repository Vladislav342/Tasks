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
	let books = await Task.openFile();            
	let newBook = Task.cikle(books, req, method);
	if(newBook !== undefined){
		books.push(newBook);
		let newBooks = Task.sortAble(books);       
		Task.writeFile(books);                     
		ctx.body = JSON.stringify(newBook, null, 2);
	}else{
		ctx.body = '<h1 style="text-align:center">The book exists !</h1>';
	}
})

router.put('/book/:id', async (ctx) => {
	let req = ctx.request.body;
	let method = ctx.method;
	let arr = await Task.openFile();   
	let newBook = Task.cikle(arr, req, method);
	if(newBook){
		newBook.title = req.title;
		newBook.author = req.author;
		newBook.year = req.year;
		Task.writeFile(arr)
		ctx.body = newBook;
	}else{
		ctx.body = '<h1 style="text-align:center">The book is not existed !</h1>'
	}
})

router.delete('/books/:id', async (ctx) => {
	let id = Number(ctx.params.id) ;
	let books = await Task.openFile();           
	let index = Task.cikle2(books, id);
	if(index > -1){
		let book = books.splice(index,1);
		console.log('book', book);
		Task.writeFile(books);					
		ctx.body = 'the book is deleted';
	}else{
		ctx.body = '<h1 style="text-align:center">The book does not existed !</h1>';
	}
})

module.exports = router;