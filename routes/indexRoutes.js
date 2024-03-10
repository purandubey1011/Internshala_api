const express = require("express");
const router = express.Router();

const { homepage,
    studentsignup,
    studentsignin,
    studentsignout,
    currentUser,
    studentsendmail,
    studentforgetlink,
    studentresetpassword,
    studentupdate,
    studentavatar,
    applyjob,
    applyinternship
} = require("../controllers/indexControllers");
const { isAuthenticated } = require("../middlewares/auth");


// Get / Homepage
router.get("/", homepage);

// POST /Student 
router.post("/student", isAuthenticated, currentUser);

// POST / Student /signup
router.post("/student/signup", studentsignup)

// POST/ Student /signin
router.post("/student/signin", studentsignin)

// GET / Student /signout
router.get("/student/signout", isAuthenticated, studentsignout)

// POST / Student /Send Mail
router.post("/student/send-mail", studentsendmail)

// post / Student /Forget-link/:studentid
router.post("/student/forget-link/:id", studentforgetlink);

// POST / Student /reset-password/studentid
router.post("/student/reset-password/:id", isAuthenticated, studentresetpassword);

// POST / Student /update/studentid
router.post("/student/update/:id", isAuthenticated, studentupdate);

// POST / Student /avatar/studentid
router.post("/student/avatar/:id", isAuthenticated, studentavatar);

//------------------Apply internship---------------

// POST / Student /apply/internship/internshipid
router.post("/student/apply/internship/:internshipid", isAuthenticated, applyinternship);

//------------------Apply job--------------- 

// POST / Student /apply/job/jobid
router.post("/student/apply/job/:jobid", isAuthenticated, applyjob);

module.exports = router;