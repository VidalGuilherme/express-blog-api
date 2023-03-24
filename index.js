import express from 'express';
import conn from './src/database/db.js';
import dotenv from 'dotenv';

import swaggerRoute from './src/routes/swagger.route.js';

import authRoute from './src/routes/auth.route.js';
import usersRoute from './src/routes/users.route.js';
import newsRoute from './src/routes/news.route.js';

import authRouteAdmin from './src/admin/routes/auth.route.js';
import usersRouteAdmin from './src/admin/routes/users.route.js';
import newsRouteAdmin from './src/admin/routes/news.route.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

conn();
app.use(express.json());

app.use('/api-docs', swaggerRoute);

app.use('/auth', authRoute);
app.use('/users', usersRoute);
app.use('/news', newsRoute);

app.use('/admin/auth', authRouteAdmin);
app.use('/admin/users', usersRouteAdmin);
app.use('/admin/news', newsRouteAdmin);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
//module.exports = app;