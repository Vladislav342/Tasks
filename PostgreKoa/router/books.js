const Router = require('koa-router')
const router = new Router();

const obj = require('../service/books.js');

router.get('/api/books', obj.getBooks);
router.post('/api/books', obj.createBook);

module.exports = router;