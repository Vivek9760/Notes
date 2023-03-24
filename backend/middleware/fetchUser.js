const jwt = require('jsonwebtoken');
const jwtKey = 'vivek';

function fetchUser(req,res,next){
    try{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error : "Please authenticate using a valid token"});
    }
    const data = jwt.verify(token, jwtKey);
    // console.log(data);
    req.user = data.user;
    next();
}
catch(error){
    console.log(error.message);
    res.status(401).send({error : "Please authenticate using a valid token"});
  }
} 




module.exports = fetchUser;