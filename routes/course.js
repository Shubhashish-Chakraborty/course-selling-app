const { Router } = require('express');
const courseRouter = Router();

courseRouter.get('/preview' , (req , res) => {
    res.json({
        msg: "AVAILABLE COURSES!"
    })
});

courseRouter.post('/purchase' , (req , res) => {}); // PURCHASE A COURSE (implement a dummy payment method/gateway)


module.exports = {
    courseRouter: courseRouter
}