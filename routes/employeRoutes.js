const express = require("express");
const router = express.Router();

const {
    homepage,
    employesignup,
    employesignin,
    employesignout,
    currentemploye,
    employesendmail,
    employeforgetlink,
    employeresetpassword,
    employeupdate,
    employeavatar,
    createinternship,
    readinternship,
    readsingleinternship,
    createjob,
    readjob,
    readsinglejob
 } = require("../controllers/employeControllers");

const { isAuthenticated } = require("../middlewares/auth");


// Get / Homepage
router.get("/", homepage);

// POST /employe 
router.post("/current",isAuthenticated, currentemploye);

// POST / employe /signup
router.post("/signup", employesignup)

// // POST/employe /signin
router.post("/signin",employesignin)

// GET /employe /signout
router.get("/signout",isAuthenticated,employesignout)

// POST /employe /Send Mail
router.post("/send-mail",employesendmail)

// GET /employe /Forget-link/:employeid
router.get("/forget-link/:id",employeforgetlink);

// POST /employe /reset-password/employeid
router.post("/reset-password/:id",isAuthenticated,employeresetpassword);

// POST /employe /update/employeid
router.post("/update/:id",isAuthenticated,employeupdate);
 
// POST /employe /avatar/employeid
router.post("/avatar/:id",isAuthenticated,employeavatar);

//  ....................Internships.................     

// POST /employe /internship/create
router.post("/internship/created",isAuthenticated,createinternship);

// POST /employe /internship/read
router.post("/internship/read",isAuthenticated,readinternship);

// POST /employe /internship/read/id
router.post("/internship/read/:id",isAuthenticated,readsingleinternship);

//  ....................jobs.................     

// POST /employe /job/create
router.post("/job/created",isAuthenticated,createjob);

// POST /employe /job/read
router.post("/job/read",isAuthenticated,readjob);

// POST /employe /job/read/id
router.post("/job/read/:id",isAuthenticated,readsinglejob);
module.exports = router;