const dbSetup = require('./db/db-setup');
const express = require('express');
const User = require('./db/models/user');

dbSetup();

const app = express();
app.use(express.json());

//in prod put this in separate files to avoid code smells
//this is just for the tutorial 
app.get('/user', async (req,res,next) => {
	const user = await User.query().withGraphFetched('channel');
	res.json(user);
})

app.get('/user/:id', async (req, res, next) => {
	try{
		const {id} = req.params;
		const user = await User.query().findById(id).withGraphFetched('channel');
		res.json(user);
	}catch(err){
		console.log(err);
		res.status(500).json(err);
	}
})



app.listen(8080, () => console.log('server running on port 8080'));
