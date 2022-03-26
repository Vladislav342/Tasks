const Router = require('express');
const router = new Router();
const userController = require('../controller/user.controller');

router.get('/', (req,res)=>{
	console.log('hello');
	res.send('hello');
});

router.post('/user', userController.createUser);
router.get('/user', userController.getUsers);
router.get('/user/:id', userController.getOneUser);
router.put('/user', userController.updateUser);
router.delete('/user', userController.deleteUser);


module.exports = router;