const { Router } = require('express');
const adminRouter = Router();

const { AdminModel } = require('../db');

adminRouter.post('/signup' , (req , res) => {});
adminRouter.post('/login' , (req , res) => {});


module.exports = {
    adminRouter: adminRouter
}