import express from 'express';
import conn from './src/database/db.js';
import usersRoute from './src/routes/users.route.js';


const app = express();
// const bodyParser = require('body-parser');
const port = 3000;

//app.use(require('cors')());
//app.use(bodyParser.urlencoded({extended:true}));
//app.use(bodyParser.json());
conn();
app.use(express.json());


app.use('/users', usersRoute);


app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

//module.exports = app;