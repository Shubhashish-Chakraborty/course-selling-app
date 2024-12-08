const { Router } = require('express');
const adminRouter = Router();
const { z } = require("zod");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { AdminModel } = require('../db');
const { CourseModel } = require('../db');

adminRouter.post('/signup', async (req, res) => {
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
        const hasedPassword = await bcrypt.hash(password, 10);

        await AdminModel.create({
            fullname: fullname,
            username: username,
            email: email,
            password: hasedPassword
        })
    }
    catch (e) {
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


adminRouter.post('/login', async (req, res) => {
    // Implementing ZOD for input valiadtion

    const requiredBody = z.object({
        username: z.string().min(3).max(10),
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

    const username = req.body.username;
    const password = req.body.password;

    // Checking whether the admin exists in the database or not

    const admin = await AdminModel.findOne({
        username: username
    });

    if (!admin) { // If Admin Not found!
        res.status(403).json({
            msg: `Admin with Username:${username} does not exists in our database!`
        })
        return
    }

    const decryptedPassword = await bcrypt.compare(password , admin.password);

    if (!decryptedPassword) { // If password doesnt matched!
        res.status(403).json({
            msg: "Admin not Found, Incorrect Credentials!"
        }) 
    }
    else { // If admin found so allot the token and all logic
        const token = jwt.sign({
            id: admin._id.toString()
        } , process.env.JWT_ADMIN_SECRET);

        res.json({
            msg: `${admin.username} successfully LoggedIN!!`,
            username: admin.username,
            email: admin.email,
            token: token
        })
    }
});

// Admins can create the course here!
adminRouter.post('/create-course' , async (req , res) => { // Maybe implement input validation here, later
    const adminId = req.adminId;
    const { title , description , price , thumbnail } = req.body; // JSON Destructuring

    const course = await CourseModel.create({
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        adminId: adminId
    })

    res.json({
        msg: "New Course Has been created!",
        courseId: course._id
    })


})
module.exports = {
    adminRouter: adminRouter
}