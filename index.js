import express from 'express';
import cors from 'cors';
import conn from './src/database/db.js';
import dotenv from 'dotenv';

import swaggerRoute from './src/routes/swagger.route.cjs';

import authRoute from './src/routes/auth.route.js';
import newsRoute from './src/routes/news.route.js';
import readersRoute from './src/routes/readers.route.js';

import authRouteAdmin from './src/admin/routes/auth.route.js';
import usersRouteAdmin from './src/admin/routes/users.route.js';
import newsRouteAdmin from './src/admin/routes/news.route.js';
import readersRouteAdmin from './src/admin/routes/readers.route.js';

dotenv.config();    

const app = express();
const port = process.env.PORT || 3000;

app.use(
    cors({
        origin: process.env.ORIGIN_CORS_ALLOW,
        optionsSuccessStatus: 200,
        methods: ['GET', 'POST', 'PUT', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    })
);

conn();
app.use(express.json());

app.use('/api-docs', swaggerRoute);

app.use('/auth', authRoute);
app.use('/news', newsRoute);
app.use('/readers', readersRoute);

app.use('/admin/auth', authRouteAdmin);
app.use('/admin/users', usersRouteAdmin);
app.use('/admin/news', newsRouteAdmin);
app.use('/admin/readers', readersRouteAdmin);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
//module.exports = app;