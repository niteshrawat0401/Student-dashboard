const jwt = require("jsonwebtoken");
require("dotenv").config();

// Verify token
const authentication = (req, res, next) =>{
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(token == null){
        return res.status(400).json({msg : "Token not present"});
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, user)=>{
        if(err){
            return res.status(403).json({msg: "Invalid token"});
        }
        req.user = user;
        next()
    })
}

module.exports = authentication;