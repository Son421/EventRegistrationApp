var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var eventsRouter = require('./routes/events');

var app = express();

try {
    mongoose.connect('mongodb+srv://fkca1ci15bcc:gVxJ2uuj9Nki6T79@cluster0.myyiilo.mongodb.net/EventRegistrationApp?retryWrites=true&w=majority');
} catch (e) {
    console.log(e);
}

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/events', eventsRouter);

module.exports = app;
