const { AdminModel } = require("../db");
const jwt = require('jsonwebtoken');


async function adminAuth(req , res , next) { // MAYBE IMPLEMENT INPUT VALIDATION HERE AS WELL, LATER
    const username = req.body.username; // Or can remove this user check as well, Ive implemented this because in our database username is unique
    const token = req.headers.token;

    const user = await AdminModel.findOne({
        username: username
    })

    if (!user) { // If user doesnt exists!
        res.status(403).json({
            msg: "Admin Doesnt Exists In our database!"
        })
        return
    }

    // Authentication

    const decodedData = jwt.verify(token , process.env.JWT_ADMIN_SECRET);

    if (!decodedData) {
        res.status(403).json({
            msg: 'INCORRECT CREDENTIALS!, Cannot LogIN'
        })
    }
    else {
        req.adminId = decodedData.id;
        next();
    }

}


module.exports = {
    adminAuth: adminAuth
}