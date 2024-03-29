const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student = require("../models/studentModel")
const Internship = require("../models/internshipModel")
const Job = require("../models/jobModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SendToken");
const { sendMail } = require("../utils/nodemailer");
const path = require("path");
const imagekit = require("../utils/imagekit").initimagekit();

exports.homepage = catchAsyncErrors(async function (req, res, next) {
        res.json({ message: "Homepage! " });
});

exports.currentUser = catchAsyncErrors(async function (req, res, next) {
        const student = await Student.findById(req.id).exec();

        res.json({ student });
});

exports.studentsignup = catchAsyncErrors(async function (req, res, next) {
        // res.json(req.body);
        const student = await Student(req.body).save();
        res.status(201).json(student);
        sendtoken(student, 201, res);
});

exports.studentsignin = catchAsyncErrors(async function (req, res, next) {
        const student = await Student.findOne({ email: req.body.email }).select("+password").exec();
        if (!student) return next(new ErrorHandler("user note found with this email address", 404));

        const isMatch = student.comparepassword(req.body.password);
        if (!isMatch) return next(new ErrorHandler("wrong credientails", 500))
        sendtoken(student, 200, res)

});

exports.studentsignout = catchAsyncErrors(async function (req, res, next) {
        res.clearCookie("token");
        res.json({ message: "Succesfully Signout!" })
});

exports.studentsendmail = catchAsyncErrors(async function (req, res, next) {
        const student = await Student.findOne({ email: req.body.email }).exec();
        console.log(student);
        if (!student) return next(new ErrorHandler("Student Not Found! with this email address", 404));

        const url = `${req.protocol}://${req.post("host")}/student/forget-link/${student._id}`;

        sendMail(req, res, next, url);
        student.resetPasswordToken = "1";
        await student.save();
        res.json({ student, url });


});

exports.studentforgetlink = catchAsyncErrors(async function (req, res, next) {
        const student = await Student.findById(req.params.id).exec();
        console.log(student)
        if (!student) return next(new ErrorHandler("Student Not Found! with this email address", 404));

        if (student.resetPasswordToken == "1") {
                student.resetPasswordToken = "0";
                student.password = req.body.password;
                await student.save();
        } else {
                return next(new ErrorHandler("Invalid Password Reset Link! Please Try again", 500));
        }
        res.status(200).json({
                message: "Password has been  Succesfully Changed"
        })
});

exports.studentresetpassword = catchAsyncErrors(async function (req, res, next) {
        const student = await Student.findById(req.id).exec();
        student.password = req.body.password;
        await student.save();

        sendtoken(student, 201, res);

});

exports.studentupdate = catchAsyncErrors(async function (req, res, next) {
        await Student.findByIdAndUpdate(req.params.id, req.body).exec();

        res.status(200).json({
                success: true,
                message: "Student updated Succesfully",
        });

});


exports.studentavatar = catchAsyncErrors(async function (req, res, next) {
        const student = await Student.findById(req.params.id).exec();
        const file = req.files.avatar;
        const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(file.name)}`;
        if (student.avatar.fileId !== "") {
                await imagekit.deleteFile(student.avatar.fileId);
        };
        const { fileId, url } = await imagekit.upload({
                file: file.data,
                fileName: modifiedFileName,
        });
        student.avatar = { fileId, url };
        await student.save();

        res.status(200).json({
                success: true,
                message: "Profile image uploaded",
        });

        //      res.json({image});

});
//------------------Apply internship---------------

exports.applyinternship = catchAsyncErrors(async function (req, res, next) {
        const student = await Student.findById(req.id).exec();
        const internship = await Internship.findById(req.params.internshipid).exec();
        student.internships.push(internship._id);
        // internship.students.push(student._id);

        await student.save();
        await internship.save();
        res.json({ student, internship });
});

//------------------Apply job---------------

exports.applyjob = catchAsyncErrors(async function (req, res, next) {
        const student = await Student.findById(req.id).exec();
        const job = await Job.findById(req.params.jobid).exec();
        student.jobs.push(job._id);
        // job.students.push(student._id);
        await student.save();
        await job.save();
        res.json({ student, job });
});
