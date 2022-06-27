const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 200
    },
    userID: String,
    isComplete: Boolean,
    date: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('Todo', toDoSchema);