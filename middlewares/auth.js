const jwt = require("jsonwebtoken");
const Register = require('../models/registers');

const auth = async (req,res,next) => {
    try{
        const  token = req.cookies.jwt;
        const verfiyUser = jwt.verify(token,process.env.AUTH_TOKEN);
        const user = await Register.findOne({_id:verfiyUser._id});

        req.token = token;
        req.user = user;
        next();
    }catch(error){
        res.status(401).send(error);
    }
}

module.exports = auth;
