const path = require('path');

//controllers requirement
const validateRoute = require('../controllers/validateRoute');

//mongoose requirement
const Model = require('../model/UrlModel');

//expressjs requirement
const express = require('express');
const app = express();

//socket.io requirement
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);


const getId = async(req, res) => {
    if(path.extname(req.url).length > 0) return;    

    const { id } = req.params;
    const route = validateRoute(id);
    console.log('route: ', route);
    console.log('id: ', id);
    if(route.length == 0) return res.redirect('/');

    //socket.io
    io.on('connection', (socket) => {
        console.log(`id: ${socket.id} connected`);
        socket.on('save-time', async(data) => {
            console.log(data.content);
            await Model.findOneAndUpdate({url: id}, {content: data.content});
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
        
        return res.render('main', {content: null});
    }
}

module.exports = getId;