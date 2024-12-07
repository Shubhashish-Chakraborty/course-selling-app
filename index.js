const express = require('express');
const PORT = 3000

const app = express();
const { userRouter } = require('./routes/user');
const { courseRouter } = require('./routes/course');
const { adminRouter } = require('./routes/admin');

app.use(express.json());


app.use("/user" , userRouter);
app.use("/course" , courseRouter);
app.use('/admin' , adminRouter);

app.listen(PORT);