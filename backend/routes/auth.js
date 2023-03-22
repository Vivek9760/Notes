const express = require("express");
const User = require("../models/user");
const router = express.Router();
const { body, validationResult } = require("express-validator");



//Create a user using POST "api/auth/createUser"  for signup.
router.post(
  "/createUser",
  //use express validator for validation
  [
    body("name","Enter a valid name").isLength({ min: 3 }),
    body("email","Enter a valid email").isEmail(),
    body("password","password must be 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
   
    // express-validator code for detecting the errors of validation we set in line No. 13-15
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
    try{
      let user = await User.findOne({email: req.body.email});
      if(user){
        return res.status(400).json({error : "a user with this email already exists"})
      }
      user = await User(req.body);
      await user.save();
      res.send(user);
      }
      catch(error){
        console.log(error.message);
        res.status(400).send({"Error":"Unusual Error Occured"});
      }
    
  }
);

module.exports = router;
