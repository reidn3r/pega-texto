require('dotenv').config();
const path = require('path');
const morgan = require('morgan');

//mongoose require
const mongoose = require('mongoose');
const mongoConnect = require('./config/dbConnect');

//expressjs require
const express = require('express');
const app = require('./controllers/renderViews').app;

const server = require('./controllers/renderViews').server;

//db connect
mongoose.set('strictQuery', true);
mongoConnect();

//log requests
app.use(morgan('tiny'));

//static-files
app.use(express.static(path.join(__dirname, '/public')));

//body-parser
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

//view-engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//routes
app.use('/', require('./routes/router'));

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`running at: http://localhost:${PORT}`));