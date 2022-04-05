const dbSetup = require('./db/db-setup');
const express = require('express');
const User = require('../db/models/user');

dbSetup();

const app = express();
app.use(express.json());

app.get('/user/:id', (req, res, next) => {
	const {id} = req.params;
	const user = await User.query().findBy(id);
})

app.listen(8080, () => console.log('server running on port 8080'));
