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

module.exports = router;