const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;


const Users = new Schema({
    fullname: String,
    username: {type:String , unique:true},
    email: {type:String , unique:true},
    password: String
});

const Admins = new Schema({
    fullname: String,
    username: {type:String , unique:true},
    email: {type:String , unique:true},
    password: String
});

const Courses = new Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    adminId: ObjectId
})

const Purchases = new Schema({
    userId: ObjectId, // This user Bought :
    courseId: ObjectId // THIS COURSE!
})


const UserModel = mongoose.model("users" , Users);
const AdminModel = mongoose.model("admins" , Admins);
const CourseModel = mongoose.model("courses" , Courses);
const PurchaseModel = mongoose.model("purchases" , Purchases);


module.exports = {
    UserModel: UserModel,
    AdminModel: AdminModel,
    CourseModel: CourseModel,
    PurchaseModel: PurchaseModel
}