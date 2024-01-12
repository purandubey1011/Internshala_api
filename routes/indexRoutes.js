const express = require("express");
const router = express.Router();

const {studentsignup,studentsignin,studentsignout, homepage } = require("../controllers/indexControllers");


// Get / Route
router.get("/", homepage);

// POST / Student /signup
router.post("/student/signup", studentsignup)

// POST/ Student /signin
router.post("/student/signin", studentsignin)

// GET / Student /signout
router.get("/student/signout", studentsignout)

module.exports = router;