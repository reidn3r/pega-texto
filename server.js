require('dotenv').config();
const path = require('path');
const fsPromise = require('fs').promises;
const morgan = require('morgan');
const mongoose = require('mongoose');
const mongoConnect = require('./config/dbConnect');
const Model = require('./model/UrlModel');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const http = require('http');
const server = http.createServer(app);


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
    if(path.extname(req.url).length > 0) return;

    const { id } = req.params;
    const foundRoute = await Model.findOne({ url: id });
    
    if (foundRoute){
        const update = await Model.findOneAndUpdate({_id: foundRoute._id}, {num_access: foundRoute.num_access + 1});
        return res.render('main');
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