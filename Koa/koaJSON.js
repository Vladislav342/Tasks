const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');

const app = new Koa();
const router = new Router();

router.get('/books', ctx => {
	let content = fs.readFileSync('books/books.json', 'utf8')
  	let books = JSON.parse(content)
	ctx.body = JSON.stringify(books, null, 2);
})

router.post('/books', ctx => {
	console.log(ctx.request.body);
	let obj = {
		id:ctx.request.body.id, 
		title:ctx.request.body.title, 
		author:ctx.request.body.author, 
		year:ctx.request.body.year
	};
	console.log(obj)
	let existObj;
	let data = fs.readFileSync('books/books.json', 'utf8');
	let books = JSON.parse(data);
	for(let i=0; i<books.length; i++){
		if(books[i].id == obj.id){
			existObj = books[i];
			break;
		}
	}

	if(!existObj){
		books.push(obj)
		fs.writeFileSync('books/books.json', JSON.stringify(books, null, 2));
		ctx.body = books;
	}else{
		ctx.body = '<h1 style="text-align:center">The book exists !</h1>';
	}
	
})

router.get('/book/:id', ctx => {
	let data = fs.readFileSync('books/books.json', 'utf8');
	let book = JSON.stringify(JSON.parse(data)[ctx.params.id], null, 2)
	ctx.body = book;
})

router.put('/book/:id', ctx => {
	console.log(ctx.request.body)
	let obj2 = {
		id:     ctx.request.body.id, 
		title:  ctx.request.body.title, 
		author: ctx.request.body.author, 
		year:   ctx.request.body.year
	};
	let data = fs.readFileSync('books/books.json', 'utf8');
	console.log(data)
	let arr = JSON.parse(data);
	console.log(arr);
	let newBook;
	for(let i=0; i<arr.length; i++){
		if(arr[i].id == obj2.id){
			newBook = arr[i];
			break
		}
	}
	if(newBook){
		newBook.title = obj2.title;
		newBook.author = obj2.author;
		newBook.year = obj2.year;
		let data2 = JSON.stringify(arr, null, 2);
		fs.writeFileSync('books/books.json', data2);
		ctx.body = newBook;
	}
})

router.delete('/books/:id', ctx => {
	let id = ctx.params.id;
	console.log(ctx.params.id);
	let data = fs.readFileSync('books/books.json', 'utf8');
	let books = JSON.parse(data);
	console.log(books);
	let index = -1;
	for(let i=0;i<books.length;i++){
		if(books[i].id == id){
			index = i;
			break;
		}
	}
	if(index > -1){
		let book = books.splice(index,1)[0];
		console.log(book);
		let data2 = JSON.stringify(books);
		fs.writeFileSync('books/books.json', data2);
		ctx.body = book;
	}else{
		ctx.body = '<h1 style="text-align:center">The book does not exist !</h1>';
	}

})

app.use(require('koa-body')());
app.use(router.allowedMethods());
app.use(router.routes());

app.use(async (ctx) => {
	ctx.body = '<h1 style="text-align:center">Page #404</h1>';
})

app.listen(3000, () => {
	console.log('Server is ready')
});

