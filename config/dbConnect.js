const mongoose = require('mongoose');

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
        console.log('mongodb connected');
    }
    catch(err){
        console.log(err);
    }
}

module.exports = connectDB;