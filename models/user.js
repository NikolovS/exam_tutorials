const mongoose = require('mongoose');
const UserShcema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
       
    },

    password: {
        type: String,
        required: true,
        
    },

    courses: [{
        type: 'ObjectId',
        ref: 'course'
    }]

})

module.exports = mongoose.model('User', UserShcema);