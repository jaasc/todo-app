const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 80,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 1024
    }
});

module.exports = mongoose.model('Users', userSchema);