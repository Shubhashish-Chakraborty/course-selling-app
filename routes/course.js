const { Router } = require('express');
const courseRouter = Router();

const { userAuth } = require('../middlewares/userauth');

const { PurchaseModel } = require('../db');
const { CourseModel } = require('../db');

courseRouter.get('/preview' , async (req , res) => {
    const allCourses = await CourseModel.find({}); // GIVE ALL THE DATA

    // res.json({
    //     allCourses
    // });

    res.json(allCourses)
});

courseRouter.post('/purchase' , userAuth , async (req , res) => { // PURCHASE A COURSE (implement a dummy payment method/gateway if possible)
    const userId = req.userId;
    const courseId = req.body.courseId;

    // Maybe add a logic to prevent buying a same course twice..

    await PurchaseModel.create({
        userId: userId,
        courseId: courseId
    })

    res.json({
        msg: "YouHave successfully bought the Course"
    })
});


module.exports = {
    courseRouter: courseRouter
}