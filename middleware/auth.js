const jwt = require('jsonwebtoken');

const authenticationMiddleware = async(req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log(authHeader);
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
    } catch (error) {
        res.status(401).json({success:false, msg: "Unauthorized"});
    }
}

module.exports = authenticationMiddleware;