const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const port = 3000;

//app.use(require('cors')());
//app.use(bodyParser.urlencoded({extended:true}));
//app.use(bodyParser.json());
app.use(express.json());

const usersRoute = require('./src/routes/users.route');
app.use('/users', usersRoute);


app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

//module.exports = app;