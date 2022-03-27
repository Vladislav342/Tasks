const Router = require('koa-router')
const router = new Router();

const obj = require('../service/books.js');

router.get('/api/books', obj.getBooks);
router.post('/api/books', obj.createBook);
router.get('/api/book/:id', obj.getOneBook);
router.put('/api/book', obj.updateBook);
router.delete('/api/book/:id', obj.deleteBook);

module.exports = router;