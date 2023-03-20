const ConnectToDB = require('./db.js');
const express = require('express');
const app = express();
ConnectToDB();

app.use(express.json());

app.use('/api/auth',require('./routes/auth.js'));

app.use('/api/notes',require('./routes/notes.js'));


app.listen(5000,()=>{
    console.log(`App listening at http://localhost:${5000} `);
})