var createError = require('http-errors');
var express = require('express');
var path = require('path');
const PORT = 8080


const indexRouter = require('./routes/index');
const productsRouter = require('./routes/productsPUG');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/productsPUG', productsRouter);


app.listen(PORT)