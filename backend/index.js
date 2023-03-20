const ConnectToDB = require('./db.js');
const express = require('express');
const app = express();
ConnectToDB()

app.get('/',(req,res)=>{
    res.send("Hello World");
})

app.listen(5000,()=>{
    console.log(`App listening at http://localhost:${5000} `)
})