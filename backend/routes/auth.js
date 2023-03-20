const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.post('/',(req,res)=>{
    try{
        const user = User(req.body);
        user.save();
        res.send(user);
    }
    catch{
        console.log("Error");
    }

})

module.exports = router;