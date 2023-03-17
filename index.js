import express from 'express';
import conn from './src/database/db.js';
import dotenv from 'dotenv';


import authRoute from './src/routes/auth.route.js';
import usersRoute from './src/routes/users.route.js';
import newsRoute from './src/routes/news.route.js';
import swaggerRoute from './src/routes/swagger.route.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

conn();
app.use(express.json());
app.use('/users', usersRoute);
app.use('/auth', authRoute);
app.use('/news', newsRoute);
app.use('/api-docs', swaggerRoute);


app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

//module.exports = app;