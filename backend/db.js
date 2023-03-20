const mongoose = require('mongoose');

async function ConnectToDB(){
   await mongoose.connect('mongodb://127.0.0.1:27017/');
   console.log("Connected Succefully");
}

module.exports = ConnectToDB;