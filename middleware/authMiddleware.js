const jwt = require("jsonwebtoken")
const authenticate = (req,res,next)=>{
    const authHeaders = req.headers['authorization'];

    const token = authHeaders && authHeaders.split(' ')[1];

    if(!token){
        return res.status(401).json({
            message:"you are not allowed to access resource"
        })
    }

    jwt.verify(token, process.env.JWT_SECRET, (error,user)=>{
        if(error)return res.status(403).json({message:"you are not authorized to allow here"});
        req.user = user;
        next();
    })
}

module.exports = {authenticate}