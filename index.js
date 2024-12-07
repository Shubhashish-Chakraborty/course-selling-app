require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const { userRouter } = require('./routes/user');
const { courseRouter } = require('./routes/course');
const { adminRouter } = require('./routes/admin');

app.use(express.json());


app.use("/api/v1/user" , userRouter);
app.use('/api/v1/admin' , adminRouter);
app.use("/api/v1/course" , courseRouter);

// If the database connection failed so there is no sense to start our backend.
// So in this case we need to ensure that our backend doesn't gets started until its not connected to the database!

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(process.env.PORT);
    console.log("Database Connection Successfully Established!, Good TO go!");
}

main();