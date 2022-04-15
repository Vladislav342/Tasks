const Router = require('koa-router')
const router = new Router();

const obj = require('../service/books.js')

router.get('/api/books', obj.getBooks);
router.get('/api/book/:id', obj.getOneBook);
router.post('/api/books', obj.createBook);
router.delete('/api/book/:id', obj.deleteBook);
router.put('/api/book/:id', obj.updateBook);

module.exports = router;