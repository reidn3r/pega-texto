const mongoose = require('mongoose');

const Model = mongoose.model('url-model', {
    url: {
        type: String,
        required: true,
        unique: true
    },

    num_access:{
        type:Number,
        default:0
    },

    content:{
        type:String,
        default:""
    }
});

module.exports = Model;