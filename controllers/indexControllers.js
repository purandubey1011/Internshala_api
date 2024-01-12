const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const student = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");

exports.homepage =catchAsyncErrors( async function(req,res,next){
        res.json({message:"homepage"}); 
});

exports.studentsignup = catchAsyncErrors( async function(req,res,next){
// res.json(req.body);
const student = await student(req.body).save();
res.status(201).json(student);
}); 

exports.studentsignin = catchAsyncErrors( async function(req,res,next){         
        // res.json(req.body);
const student = await student.findOne({email:req.body.email}).select("+password").exec();

if(!student) return next(new ErrorHandler("Student Not Found! with this email address", 404));

const isMatch = student.comparepassword(req.body.password);
if(!isMatch) return next (new ErrorHandler("Wrong Credientials",500));

res.json(student);
}); 

 exports.studentsignout = catchAsyncErrors( async function(req,res,next){
 }); 