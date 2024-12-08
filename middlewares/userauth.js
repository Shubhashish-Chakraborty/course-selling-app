const { UserModel } = require("../db");
const jwt = require('jsonwebtoken');


async function userAuth(req , res , next) { // MAYBE IMPLEMENT INPUT VALIDATION HERE AS WELL, LATER
    const token = req.headers.token;
    
    // Authentication
    const decodedData = jwt.verify(token , process.env.JWT_USER_SECRET);

    if (!decodedData) {
        res.status(403).json({
            msg: 'INCORRECT CREDENTIALS!, Cannot LogIN'
        })
    }
    else {
        req.userId = decodedData.id;
        next();
    }
}

module.exports = {
    userAuth: userAuth
}