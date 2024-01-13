const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student = require("../models/studentModel")
const { v4: uuidv4 } = require('uuid');
const ErrorHandler = require("../utils/ErrorHandler");

exports.resume = catchAsyncErrors(async function(req,res,next){
    const {resume} = await Student.findById(req.id).exec();
    res.json({message:"secure Resume Page!",resume})
}); 

//..................Education...................

exports.addeducation = catchAsyncErrors(async function(req,res,next){
    const student = await Student.findById(req.id).exec();
    student.resume.education.push({...req.body, id:uuidv4() });
    await student.save();
    res.json({message:"Education Added"});
});

exports.editeducation = catchAsyncErrors(async function(req,res,next){
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.resume.education.findIndex((i)=>i.id === req.params.eduid);
    student.resume.education[eduIndex] = {...student.resume.education[eduIndex] , ...req.body};
    await student.save();
    res.json({message:"Education Updated"});
});

exports.deleteeducation = catchAsyncErrors(async function(req,res,next){
    const student = await Student.findById(req.id).exec();
    const filterededu = student.resume.education.filter((i)=>i.id !== req.params.eduid);

    student.resume.education = filterededu;
    await student.save();
    res.json({message:"Education Deleted"});
});

// .......................Jobs......................

exports.addjobs = catchAsyncErrors(async function(req,res,next){
    const student = await Student.findById(req.id).exec();
    student.resume.jobs.push({...req.body, id:uuidv4() });
    await student.save();
    res.json({message:"jobs Added"});
});

exports.editjobs = catchAsyncErrors(async function(req,res,next){
    const student = await Student.findById(req.id).exec();
    const jobsIndex = student.resume.jobs.findIndex((i)=>i.id === req.params.jobid);
    student.resume.jobs[jobsIndex] = {...student.resume.jobs[jobsIndex] , ...req.body};
    await student.save();
    res.json({message:"jobs Updated"});
});

exports.deletejobs = catchAsyncErrors(async function(req,res,next){
    const student = await Student.findById(req.id).exec();
    const filteredjobs = student.resume.jobs.filter((i)=>i.id !== req.params.jobid);

    student.resume.jobs = filteredjobs;
    await student.save();
    res.json({message:"jobs Deleted"});
});

//...............internships..................

exports.addinternships = catchAsyncErrors(async function(req,res,next){
    const student = await Student.findById(req.id).exec();
    student.resume.internships.push({...req.body, id:uuidv4() });
    await student.save();
    res.json({message:"internships Added"});
});

exports.editinternships = catchAsyncErrors(async function(req,res,next){
    const student = await Student.findById(req.id).exec();
    const internshipsIndex = student.resume.internships.findIndex((i)=>i.id === req.params.internid);
    student.resume.internships[internshipsIndex] = {...student.resume.internships[internshipsIndex] , ...req.body};
    await student.save();
    res.json({message:"internships Updated"});
});

exports.deleteinternships = catchAsyncErrors(async function(req,res,next){
    const student = await Student.findById(req.id).exec();
    const filteredinternships = student.resume.internships.filter((i)=>i.id !== req.params.internid);

    student.resume.internships = filteredinternships;
    await student.save();
    res.json({message:"internships Deleteed"});
});

//...............responsibilities..................

exports.addresponsibilities = catchAsyncErrors(async function(req,res,next){
    const student = await Student.findById(req.id).exec();
    student.resume.responsibilities.push({...req.body, id:uuidv4() });
    await student.save();
    res.json({message:"responsibilities Added"});
});

exports.editresponsibilities = catchAsyncErrors(async function(req,res,next){
    const student = await Student.findById(req.id).exec();
    const responsibilitiesIndex = student.resume.responsibilities.findIndex((i)=>i.id === req.params.respid);
    student.resume.responsibilities[responsibilitiesIndex] = {...student.resume.responsibilities[responsibilitiesIndex] , ...req.body};
    await student.save();
    res.json({message:"responsibilities Updated"});
});

exports.deleteresponsibilities = catchAsyncErrors(async function(req,res,next){
    const student = await Student.findById(req.id).exec();
    const filteredresponsibilities = student.resume.responsibilities.filter((i)=>i.id !== req.params.respid);

    student.resume.responsibilities = filteredresponsibilities;
    await student.save();
    res.json({message:"responsibilities Deleteed"});
});

//...............courses..................

exports.addcourses = catchAsyncErrors(async function(req,res,next){
    const student = await Student.findById(req.id).exec();
    student.resume.courses.push({...req.body, id:uuidv4() });
    await student.save();
    res.json({message:"courses Added"});
});

exports.editcourses = catchAsyncErrors(async function(req,res,next){
    const student = await Student.findById(req.id).exec();
    const coursesIndex = student.resume.courses.findIndex((i)=>i.id === req.params.courseid);
    student.resume.courses[coursesIndex] = {...student.resume.courses[coursesIndex] , ...req.body};
    await student.save();
    res.json({message:"courses Updated"});
});

exports.deletecourses = catchAsyncErrors(async function(req,res,next){
    const student = await Student.findById(req.id).exec();
    const filteredcourses = student.resume.courses.filter((i)=>i.id !== req.params.courseid);

    student.resume.courses = filteredcourses;
    await student.save();
    res.json({message:"courses Deleted"});
});

//...............projects..................

exports.addprojects = catchAsyncErrors(async function(req,res,next){
    const student = await Student.findById(req.id).exec();
    student.resume.projects.push({...req.body, id:uuidv4() });
    await student.save();
    res.json({message:"projects Added"});
});

exports.editprojects = catchAsyncErrors(async function(req,res,next){
    const student = await Student.findById(req.id).exec();
    const projectsIndex = student.resume.projects.findIndex((i)=>i.id === req.params.projectid);
    student.resume.projects[projectsIndex] = {...student.resume.projects[projectsIndex] , ...req.body};
    await student.save();
    res.json({message:"projects Updated"});
});

exports.deleteprojects = catchAsyncErrors(async function(req,res,next){
    const student = await Student.findById(req.id).exec();
    const filteredprojects = student.resume.projects.filter((i)=>i.id !== req.params.projectid);

    student.resume.projects = filteredprojects;
    await student.save();
    res.json({message:"projects Deleted"});
});

//...............skills..................

exports.addskills = catchAsyncErrors(async function(req,res,next){
    const student = await Student.findById(req.id).exec();
    student.resume.skills.push({...req.body, id:uuidv4() });
    await student.save();
    res.json({message:"skills Added"});
});

exports.editskills = catchAsyncErrors(async function(req,res,next){
    const student = await Student.findById(req.id).exec();
    const skillsIndex = student.resume.skills.findIndex((i)=>i.id === req.params.skillid);
    student.resume.skills[skillsIndex] = {...student.resume.skills[skillsIndex] , ...req.body};
    await student.save();
    res.json({message:"skills Updated"});
});

exports.deleteskills = catchAsyncErrors(async function(req,res,next){
    const student = await Student.findById(req.id).exec();
    const filteredskills = student.resume.skills.filter((i)=>i.id !== req.params.skillid);

    student.resume.skills = filteredskills;
    await student.save();
    res.json({message:"skills Deleted"});
});

//...............accomplishments..................

exports.addaccomplishments = catchAsyncErrors(async function(req,res,next){
    const student = await Student.findById(req.id).exec();
    student.resume.accomplishments.push({...req.body, id:uuidv4() });
    await student.save();
    res.json({message:"accomplishments Added"});
});

exports.editaccomplishments = catchAsyncErrors(async function(req,res,next){
    const student = await Student.findById(req.id).exec();
    const accomplishmentsIndex = student.resume.accomplishments.findIndex((i)=>i.id === req.params.accid);
    student.resume.accomplishments[accomplishmentsIndex] = {...student.resume.accomplishments[accomplishmentsIndex] , ...req.body};
    await student.save();
    res.json({message:"accomplishments Updated"});
});

exports.deleteaccomplishments = catchAsyncErrors(async function(req,res,next){
    const student = await Student.findById(req.id).exec();
    const filteredaccomplishments = student.resume.accomplishments.filter((i)=>i.id !== req.params.accid);

    student.resume.accomplishments = filteredaccomplishments;
    await student.save();
    res.json({message:"accomplishments Deleted"});
});