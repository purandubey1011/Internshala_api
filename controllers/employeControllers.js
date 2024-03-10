const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Employe = require("../models/employeModel");
const Internship = require("../models/internshipModel");
const Job = require("../models/jobModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SendToken");
const { sendMail } = require("../utils/nodemailer");
const path = require("path")
const imagekit = require("../utils/imagekit").initimagekit();

exports.homepage = catchAsyncErrors(async function (req, res, next) {
        res.json({ message: "Secure Employe Homepage! " });
});

exports.currentemploye = catchAsyncErrors(async function (req, res, next) {
        const employe = await Employe.findById(req.id).exec();

        res.json({ employe });
});

exports.employesignup = catchAsyncErrors(async function (req, res, next) {
        const employe = await Employe(req.body).save();
        sendtoken(employe, 201, res);
});

exports.employesignin = catchAsyncErrors(async function (req, res, next) {
        const employe = await Employe.findOne({ email: req.body.email }).select("+password").exec();

        if (!employe) return next(new ErrorHandler("employe Not Found! with this email address", 404));

        const isMatch = employe.comparepassword(req.body.password);
        if (!isMatch) return next(new ErrorHandler("Wrong Credientials", 500));

        // res.json(employe);
        sendtoken(employe, 201, res);

});

exports.employesignout = catchAsyncErrors(async function (req, res, next) {
        res.clearCookie("token");
        res.json({ message: "Succesfully Signout!" })
});

exports.employesendmail = catchAsyncErrors(async function (req, res, next) {
        const employe = await Employe.findOne({ email: req.body.email }).exec();
        // console.log(employe);
        if (!employe) return next(new ErrorHandler("employe Not Found! with this email address", 404));

        const url = `${req.protocol}://${req.get("host")}/employe/forget-link/${employe._id}`;

        sendMail(req, res, next, url);
        employe.resetPasswordToken = "1";
        await employe.save();
        res.json({ employe, url });


});

exports.employeforgetlink = catchAsyncErrors(async function (req, res, next) {
        const employe = await Employe.findById(req.params.id).exec();
        if (!employe) return next(new ErrorHandler("employe Not Found! with this email address", 404));

        if (employe.resetPasswordToken == "1") {
                employe.resetPasswordToken = "0";
                employe.password = req.body.password;
                await employe.save();
        } else {
                return next(new ErrorHandler("Invalid Password Reset Link! Please Try again", 500));
        }
        res.status(200).json({
                message: "Password has been  Succesfully Changed"
        })
});

exports.employeresetpassword = catchAsyncErrors(async function (req, res, next) {
        const employe = await Employe.findById(req.id).exec();
        employe.password = req.body.password;
        await employe.save();

        sendtoken(employe, 201, res);

});

exports.employeupdate = catchAsyncErrors(async function (req, res, next) {
        await Employe.findByIdAndUpdate(req.params.id, req.body).exec();

        res.status(200).json({
                success: true,
                message: "employe updated Succesfully",
        });

});

exports.employeavatar = catchAsyncErrors(async function (req, res, next) {
        const employe = await Employe.findById(req.params.id).exec();
        const file = req.files.organizationlogo;
        const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(file.name)}`;

        if (employe.organizationlogo.fileId !== "") {
                await imagekit.deleteFile(employe.organizationlogo.fileId);
        };
        const { fileId, url } = await imagekit.upload({
                file: file.data,
                fileName: modifiedFileName,
        });

        employe.organizationlogo = { fileId, url };
        await employe.save();

        res.status(200).json({
                success: true,
                message: "Profile image uploaded",
        });

        //      res.json({image});

});

//  ....................Internships.................

exports.createinternship = catchAsyncErrors(async function (req, res, next) {
        const {profile,skill,internshiptype,city,openings,internshipStartDate,internshipEndDate,internshipDuration,responsibilities,perks,time,amount,status} = req.body
        const employe = await Employe.findById(req.id);
        const internship = new Internship({
                profile,skill,internshipDuration,internshipStartDate,internshipEndDate,
                internshiptype,city,openings,responsibilities,perks,time,stipend:{amount,status},
                employe:employe._id
        }).save()
        employe.internships.push(internship._id);
        await employe.save();
        res.status(201).json({
                success: true,
                // internship
        });
});

exports.readinternship = catchAsyncErrors(async function (req, res, next) {
        const { internships } = await Employe.findById(req.id).populate("internships");
        res.status(200).json({ success: true, internships });
});

exports.readsingleinternship = catchAsyncErrors(async function (req, res, next) {
        const internship = await Internship.findById(req.params.id).exec();
        res.status(200).json({ success: true, internship });
});

//  ....................jobs.................

exports.createjob = catchAsyncErrors(async function (req, res, next) {
        const employe = await Employe.findById(req.id).exec();
        const {profile,skill,jobtype,city,openings,StartDate,EndDate,Duration,preferences,description,perks,time,salary,assesments} = req.body
        const job = new Job({
                profile,skill,Duration,StartDate,EndDate,
                jobtype,city,openings,preferences,perks,time,description,salary,assesments,
                employe:employe._id
        }).save()
        // job.employe = employe._id;
        employe.jobs.push(job._id);
        // await job.save();
        await employe.save();
        res.status(201).json({
                success: true,
                job
        });
});

exports.readjob = catchAsyncErrors(async function (req, res, next) {
        const { jobs } = await Employe.findById(req.id).populate("jobs");
        res.status(200).json({ success: true, jobs });
});

exports.readsinglejob = catchAsyncErrors(async function (req, res, next) {
        const job = await Job.findById(req.params.id).exec();
        res.status(200).json({ success: true, job });
});