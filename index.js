const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const port = 3000;

//app.use(require('cors')());
//app.use(bodyParser.urlencoded({extended:true}));
//app.use(bodyParser.json());

// const router = express.Router();
app.get('/', (req, res) => res.json({message: 'Funcionando!'}));
//app.use('/', router);

//var clientsRouter = require('./routes/clients');
//app.use('/clients', clientsRouter);


app.listen(port);
//console.log('API funcionando!');

//module.exports = app;