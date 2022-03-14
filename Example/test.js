const fs = require('fs');
const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');

const app = new Koa();
const router = new Router();


router.get('/books', async (ctx) => {
  	ctx.body = JSON.stringify(await openFile(), null, 2);
})


router.get('/book/:id', async (ctx) => {
	console.log(ctx.params.id);
	let id = ctx.params.id;
	let obj = await openFile();
	let bookID = obj[id];
	ctx.body = JSON.stringify(bookID, null, 2)
})


function openFile(){
	  return new Promise((resolve,reject)=>{
	    let stream = fs.createReadStream('books/books.json')
	    let data = "";
	    stream.on("error", err => reject(err))
	    stream.on("data", chunk => data+=chunk)
	    stream.on("end", () => {
	    	let arr = JSON.parse(data);
	    	resolve(arr)
	    })
	})
}

app.use(require('koa-body')());
app.use(router.allowedMethods());
app.use(router.routes());


app.use(async (ctx) => {
	ctx.body = '<h1 style="text-align:center">The book does not exist !</h1>';
});

app.listen(4000, () => {
	console.log('server is ready')
});