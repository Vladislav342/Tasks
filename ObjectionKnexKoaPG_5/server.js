const app = require('./app.js');
const dbSetup = require('./db/db-setup');

dbSetup();


app.listen(4000, () => {
	console.log('server is ready on 4000 port');
});