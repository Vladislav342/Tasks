const Router = require('koa-router');
const router = new Router();

const Task = require('../service/books.js');

router.get('/books', async (ctx) => {
  	ctx.body = JSON.stringify(await Task.openFile(), null, 2);
})

router.get('/book/:id', async (ctx) => {
	console.log(ctx.params.id);
	let id = ctx.params.id;
	let obj = await Task.openFile();
	let bookID = obj[id];
	ctx.body = JSON.stringify(bookID, null, 2);
})

router.post('/books', async (ctx) => {
	let req = ctx.request.body;
	let objBody = {
		id: req.id,
		title: req.title,
		author: req.author,
		year: req.year
	}
	let books = await Task.openFile();
	console.log('books', books);
	let existObj;
	for(let i=0; i<books.length; i++){
		if(books[i].id == objBody.id){
			existObj = books[i];
			break;
		}
	}
	if(!existObj){
		books.push(objBody);
		let newBooks = Task.sortAble(books);
		console.log(newBooks);
		Task.writeFile(books);
		ctx.body = JSON.stringify(objBody, null, 2);
	}else{
		ctx.body = '<h1 style="text-align:center">The book exists !</h1>';
	}
})

router.put('/book/:id', async (ctx) => {
	console.log(ctx.request.body)
	let obj = {
		id:     ctx.request.body.id, 
		title:  ctx.request.body.title, 
		author: ctx.request.body.author, 
		year:   ctx.request.body.year
	};
	let arr = await Task.openFile();
	console.log(arr);
	let newBook;
	for(let i=0; i<arr.length; i++){
		if(arr[i].id == obj.id){
			newBook = arr[i];
			break
		}
	}
	if(newBook){
		newBook.title = obj.title;
		newBook.author = obj.author;
		newBook.year = obj.year;
		Task.writeFile(arr)
		ctx.body = newBook;
	}
})

router.delete('/books/:id', async (ctx) => {
	let id = ctx.params.id+1;
	console.log(ctx.params.id);
	let books = await Task.openFile();
	console.log('books',books);
	let index = -1;
	for(let i=0;i<books.length;i++){
		if(books[i].id == id){
			index = i;
			break;
		}
	}
	if(index > -1){
		let book = books.splice(index,1)[0];
		console.log('book', book);
		Task.writeFile(books);
		ctx.body = 'the book is deleted';
	}else{
		ctx.body = '<h1 style="text-align:center">The book does not exist !</h1>';
	}
})

module.exports = router;