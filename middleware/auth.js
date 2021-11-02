const jwt = require('jsonwebtoken');

const authenticationMiddleware = async(req, res, next) => {
    const authHeader = req.header.autorization;
    if(!authHeader){
        res.status(401).json({success:false, msg: "Unauthorized"});
    }
    const token = authHeader.split(" ")[1];
    if(token){
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.user = payload;
            next();
        } catch (error) {
            res.status(401).json({success:false, msg: "Unauthorized"});
        }

    }
}

module.exports = authenticationMiddleware;