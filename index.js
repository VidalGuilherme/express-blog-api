const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const port = 3000;

//app.use(require('cors')());
//app.use(bodyParser.urlencoded({extended:true}));
//app.use(bodyParser.json());

var usersRoute = require('./src/routes/users.route');
app.use('/users', usersRoute);


app.listen(port);
//console.log('API funcionando!');

//module.exports = app;