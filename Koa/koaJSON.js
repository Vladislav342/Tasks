const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

let books = [
  {
    "id": 1,
    "title": "The Alchemist",
    "author": "Paulo Coelho",
    "year": 1988
  },
  {
    "id": 2,
    "title": "The Prophet",
    "author": "Kahler Gibran",
    "year": 1923
  },
  {
    "id": 3,
    "title": "Greta Garbo in Anna Karenina",
    "author": "Anna Karenina",
    "year": 1963
  },
  {
    "id": 4,
    "title": "To Kill a Mockingbird",
    "author": "Anna Karenina",
    "year": 1929
  }
]

router.get('/books', ctx => {
	ctx.body = JSON.stringify(books, null, 2);
})

router.post('/books', ctx => {
	console.log(ctx.request.body);
	let obj = {id:ctx.request.body.id, title:ctx.request.body.title, author:ctx.request.body.author, year:ctx.request.body.year};
	console.log(obj)
	books.push(obj)
	ctx.body = books;
})

router.get('/book/:id', ctx => {
	ctx.body = JSON.stringify(books[ctx.params.id], null, 2)
})

router.post('/book/:id', obj => {
	console.log(obj.request.body)
	obj.body = Object.assign(books[obj.params.id], obj.request.body);
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

