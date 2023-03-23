const express = require("express");
const User = require("../models/user");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const jwtKey = 'vivek';

//Create a user using POST "api/auth/createUser"  for signup.
router.post(
  "/createUser",
  //use express validator for validation
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "password must be 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // express-validator code for detecting the errors of validation we set in line No. 13-15
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "a user with this email already exists" });
      }

        const salt = await bcrypt.genSalt(10);
        console.log(salt)
        const secPass = await bcrypt.hash(req.body.password, salt);
      console.log(secPass)
      user = await User({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      await user.save();

      const data = {
        user:{
           id : user.id
        }
      }
      const authtoken = jwt.sign(data, jwtKey);
      res.send({authtoken});
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  }
);


// "/api/auth/login"  .  no login required.

router.post('/login',[
body('email','Enter a valid email').isEmail(),
body('password','Enter a valid password').exists()]
,async(req,res)=>{

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({error : error.array()})
  }
  const {email, password} = req.body;
  
  try{
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({error : "please try to login with correct credentials"})
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
      return res.status(400).json({error : "pleas try to login with correct credentials"})
    }

    const data = {
      user:{
        id:user.id
      }
    }

    const authtoken = jwt.sign(data,jwtKey);
    res.send(authtoken)
  }
  catch(error){
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
})

module.exports = router;
