const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static');


const koaBody = require('koa-body');
const router = require('./router/books.js');

app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (ctx) => {
	ctx.body = '<h1 style="text-align:center">The library of books</h1>';
});

app.listen(4000, () => {
	console.log('server is ready');
});