const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');

const userRouter = require('./src/routes/userRoutes');
const newsRouter = require('./src/routes/newsRoutes');
const preferenceRouter = require('./src/routes/preferenceRoutes');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/news', newsRouter);
app.use('/api/v1/preferences', preferenceRouter);

module.exports = app;