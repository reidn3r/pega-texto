require('dotenv').config();
const path = require('path');
const morgan = require('morgan');

//mongoose require
const mongoose = require('mongoose');
const mongoConnect = require('./config/dbConnect');
const Model = require('./model/UrlModel');

//expressjs require
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

//socket.io require
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

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
app.get('/', (req, res) => {
    res.render('home');
})

app.post('/', async(req, res) => {
    /* Tratar input que começa com / */


    const { form_input } = req.body;
    const foundUrl = await Model.findOne({url: form_input});
    console.log('form input: ',form_input);
    if(foundUrl){
        //const update = await Model.findOneAndUpdate({url: foundUrl.url}, {num_access: foundUrl.num_access + 1});
        return res.redirect(`/${form_input}`);
    }
    else{
        const new_url = new Model({url:form_input});
        await new_url.save();
        return res.redirect(`/${form_input}`);
    }
})

app.get('/:id', async(req, res) => {
    /* Tratar input que começa com / */

    if(path.extname(req.url).length > 0) return;    
    const { id } = req.params;

    //socket.io
    io.on('connection', (socket) => {
        console.log(`id: ${socket.id} connected`);
        socket.on('save-time', async(data) => {
            console.log(data.content);
            const routeToUpdate = await Model.findOneAndUpdate({url: id}, {content: data.content});
        })

        socket.on('input-changed', (data) => {
            console.log(data.content);
            io.emit('text-changed', (data));
        })
    })

    //route handler
    const foundRoute = await Model.findOne({ url: id });
    if (foundRoute){
        const update = await Model.findOneAndUpdate({_id: foundRoute._id}, {num_access: foundRoute.num_access + 1});
        return res.render('main', {content: foundRoute.content});
    }
    else{
        const newRoute = new Model({url: id});
        await newRoute.save();

        //update new route num_acces to 1
        const foundNewRoute = await Model.findOne({url: id});
        const update = await Model.findOneAndUpdate({_id: foundNewRoute._id}, {num_access: foundNewRoute.num_access + 1});
        
        return res.render('main');
    }
});


server.listen(PORT, () => console.log(`running at: http://localhost:${PORT}`));