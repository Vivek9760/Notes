const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    title:{
        type : String,
        required : true
    },
    description:{
        type : String,
        required : true
    },
    tag:{
        type : String,
        default : "General"
    },
    date:{
        type : Date,
        defualt : Date.now
    }
});

const model = mongoose.model('notes',notesSchema);

module.exports = model;