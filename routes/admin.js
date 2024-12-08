const { Router } = require('express');
const adminRouter = Router();
const { z } = require("zod");
const bcrypt = require('bcrypt');
const { AdminModel } = require('../db');

adminRouter.post('/signup' , async (req , res) => {
    // Implementing ZOD for input valiadtion

    const requiredBody = z.object({
        fullname: z.string().min(3).max(100),
        username: z.string().min(3).max(10),
        email: z.string().email(),
        password: z.string().min(2).max(100)
    });

    // Parsing req.body

    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if (!parsedDataWithSuccess.success) {
        res.status(400).json({
            msg: "Invalid Format!",
            error: parsedDataWithSuccess.error.issues
        })
        return
    }

    // Uptill here input validation is done!

    const fullname = req.body.fullname;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    // Error may occur because may be if the username/email already exists in the database, as {unique:true}
    let errorFound = false;
    try {
        const hasedPassword = await bcrypt.hash(password , 10);

        await AdminModel.create({
            fullname: fullname,
            username: username,
            email: email,
            password: hasedPassword
        })  
    }
    catch(e) {
        res.status(403).json({
            msg: "Email or username provided already Exists!",
        })
        errorFound = true;
    }

    if (!errorFound) { // If no error found!
        res.json({
            msg: `Admin: ${username}, Successfully SignedUP to the database, With proper INPUT VALIDATION :)`
        });
    }
});


adminRouter.post('/login' , (req , res) => {});


module.exports = {
    adminRouter: adminRouter
}