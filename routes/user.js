const { Router } = require('express');
const { z } = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../db');

const userRouter = Router();

userRouter.post('/signup' , async (req , res) => {
    const requiredBody = z.object({
        fullname: z.string().min(3).max(100),
        username: z.string().min(3).max(10),
        email: z.string().email(),
        password: z.string().min(2).max(100)
    });

    // parse the req.body
    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if (!parsedDataWithSuccess.success) { // If not success
        res.status(400).json({
            msg: "Invalid Format",
            error: parsedDataWithSuccess.error.issues
        })
        return
    }

    // UPTO Here input validation is done!, Now proceed with what you wanna do.

    const fullname = req.body.fullname;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    let errorFound = false;
    try { // Error may occur because may be if the username/email already exists in the database, as {unique:true}
        const hashedPassword = await bcrypt.hash(password , 10);
    
        await UserModel.create({
            fullname: fullname,
            username: username,
            email: email,
            password: hashedPassword
        });
    }
    catch (e) {
        res.status(403).json({
            msg: `Email or Username already Exists!!!`
        });
        errorFound = true;
    }

    if (!errorFound) {
        res.json({
            msg: `${username} Successfully SignedUP to the database, With proper INPUT VALIDATION :)`
        });
    }
});

userRouter.post('/login' , async (req , res) => {
    const requiredBody = z.object({
        username: z.string().min(3).max(10),
        password: z.string().min(2).max(100)
    });

    // parse the req.body

    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if (!parsedDataWithSuccess.success) {
        res.status(400).json({
            msg: "Invalid Format",
            error: parsedDataWithSuccess.error.issues
        })
        return
    }
    // UPTILL THIS POINT, ITS INPUT VALIDATION!

    const username = req.body.username;
    const password = req.body.password;

    const user = await UserModel.findOne({
        username: username
    })

    if (!user) {
        res.status(403).json({
            msg: `User with Username:${username} does not exists in our database!`
        })
        return
    }

    const decryptedPassword = await bcrypt.compare(password , user.password);

    if (!decryptedPassword) { // If password doesnt matched!
        res.status(403).json({
            message: "User Not Found, Incorrect Credentials Provided!!!"
        });
    }
    else { // IF user found -> allot a JWT and login
        const token = jwt.sign({
            id: user._id.toString()
        } , process.env.JWT_SECRET);

        res.json({
            msg: `${user.username} successfully LoggedIN!!`,
            username: user.username,
            email: user.email,
            token: token
        })
    }
});

userRouter.get('/purchases' , (req , res) => {}); // USER PURCHASED COURSES!


module.exports = {
    userRouter: userRouter
}