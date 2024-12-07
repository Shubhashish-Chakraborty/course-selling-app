const { Router } = require('express');
const userRouter = Router();

userRouter.post('/signup' , (req , res) => {});

userRouter.post('/login' , (req , res) => {});

userRouter.get('/purchases' , (req , res) => {}); // USER PURCHASED COURSES!


module.exports = {
    userRouter: userRouter
}