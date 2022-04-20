const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static');
const koaBody = require('koa-body');

const router = require('./router/books.js');

app.use(koaBody());


app.use(async (ctx, next) => {
	try{
		await next();
	}catch(err){
		console.log('in the error');
		console.log(err.message);
		ctx.status = err.statusCode || err.status || 500;
		ctx.body = {
			message: err.message
		};
	}
});


app.use(router.routes());
app.use(router.allowedMethods());


app.use(async (ctx) => {
	ctx.body = '<h1 style="text-align:center">The library of books</h1>';
});


module.exports = app;