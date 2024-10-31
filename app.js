const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const { engine } = require('express-handlebars');
const Helper = require('handlebars/runtime');
const errorHandler = require('./utils/errorHandle');
const { timeFormatter } = require('./utils/helper');
const helper = Helper.helpers;
const authRoutes = require('./routes/auth.routes.js')

const DB_URL = 'mongodb://admin:admin@localhost:27099/?authSource=admin'

mongoose
    .connect(DB_URL)
    .then(() => {
        console.log('Connected to database successfully.....');
    })
    .catch((error) => {
        console.error('Failed to connect to the database!!!!!!', error);
    });

const app = express();

// view engine setup
app.engine(
    'hbs',
    engine({
        extname: 'hbs',
        defaultLayout: 'main',
        helpers: {
            ...helper,
            timeFormate : timeFormatter()
        },
    })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authRoutes);

// Centralized error-handling
app.use(errorHandler);

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});