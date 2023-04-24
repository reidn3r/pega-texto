require('dotenv').config();
const path = require('path');
const morgan = require('morgan');

//mongoose require
const mongoose = require('mongoose');
const connectDB = require('./config/dbConnect');

const express = require('express');
const app = express();

//socket.io requirement
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
app.set('socketio', io);

//db connect
mongoose.set('strictQuery', true);
connectDB();

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