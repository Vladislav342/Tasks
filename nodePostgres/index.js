const express = require('express');
const app = express();

const userRouter = require('./routes/user.routes');

const PORT = 8000;


app.use(express.json());
app.use('/api', userRouter);

app.listen(PORT, () => console.log('server is started'));