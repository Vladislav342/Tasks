const Router = require('koa-router');
const router = new Router();

const { validationSchemaForAuthor, validationSchemaForId, validationSchemaForObject } = require('./validSchema');

const obj = require('../service/books.js');

const validationMiddleware = (paramname, schema, ...emg) => {
	return async (ctx, next) => {
			let result = false;
			let result2 = false;

			function validation(paramname, schema){
				if(paramname === 'request.body'){
					return schema.validate(ctx.request.body);
				}else{
					return schema.validate({ [paramname]: ctx.params[paramname]});		
				}
			}

			result = validation(paramname, schema);

			if(emg.length>0){
				let [paramname2, schema2] = [...emg]; 
				result2 = validation(paramname2, schema2);
			} 

			if(result.error){
				//console.log('throw');
				throw new Error(result.error);
			}else if(emg.length > 0 && result2.error){
				//console.log('throw______2');
				throw new Error(result2.error);
			}else{
				//console.log('next')
				await next();
			}
	}
}


router.get('/api/books', async (ctx) => {
	const books = await obj.getBooks();
	books.sort((a,b) => { return a.id - b.id});
	ctx.body = "<pre>"+JSON.stringify(books, null, 2)+"</pre>";
});

router.get('/api/book/:id', validationMiddleware('id', validationSchemaForId), async (ctx) => {
	const book = await obj.getOneBook(ctx.params.id);
	ctx.body = "<pre>"+JSON.stringify(book, null, 2)+"</pre>";
});

router.post('/api/books', validationMiddleware('request.body', validationSchemaForObject), async (ctx) => {
	let newBook = await obj.createBook(ctx.request.body);
	ctx.body = newBook;
});

router.delete('/api/book/:id', validationMiddleware('id', validationSchemaForId),  async (ctx) => {
	let delBook = await obj.deleteBook(ctx.params.id);
	ctx.body = "the book is deleted";
});

router.put('/api/book/:id', validationMiddleware('id', validationSchemaForId, 'request.body', validationSchemaForObject),  async (ctx) => {
	let upBook = await obj.updateBook(ctx.params.id, ctx.request.body);
	ctx.body = "the book is changed";
});

module.exports = router;