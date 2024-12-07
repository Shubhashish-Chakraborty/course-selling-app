require('dotenv').config();

const express = require('express');

const app = express();
const { userRouter } = require('./routes/user');
const { courseRouter } = require('./routes/course');
const { adminRouter } = require('./routes/admin');

app.use(express.json());


app.use("/api/v1/user" , userRouter);
app.use('/api/v1/admin' , adminRouter);
app.use("/api/v1/course" , courseRouter);

app.listen(process.env.PORT);