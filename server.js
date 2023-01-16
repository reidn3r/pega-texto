require('dotenv').config();
const path = require('path');
const morgan = require('morgan');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;


//log requests
app.use(morgan('dev'));

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

app.post('/', (req, res) => {
    const { form_input } = req.body;
    res.redirect(`/${form_input}`);
})

app.get('/:id', (req, res) => {
    res.render('main');
});


app.listen(PORT, () => console.log(`running at: http://localhost:${PORT}`));