const express = require("express");
const router = express.Router();
const {createResume, editResume ,resume,addeducation,editeducation,deleteeducation,addjobs,editjobs,deletejobs,addinternships,editinternships,deleteinternships,addresponsibilities,editresponsibilities,deleteresponsibilities,addcourses,editcourses,deletecourses,addprojects,editprojects,deleteprojects,addskills,editskills,deleteskills,addaccomplishments,editaccomplishments,deleteaccomplishments} = require("../controllers/resumeControllers");
const { isAuthenticated } = require("../middlewares/auth");


// Get / Homepage
router.get("/", isAuthenticated,resume);

// ....................Resume................
router.post("/create", isAuthenticated,createResume);

router.post("/update", isAuthenticated,editResume);

// ....................Education................

// POST / ADD EDUCATION
router.post("/add-edu", isAuthenticated,addeducation);


// POST / Edit EDUCATION
router.post("/edit-edu/:eduid", isAuthenticated,editeducation);

// POST / delete EDUCATION
router.post("/delete-edu/:eduid", isAuthenticated,deleteeducation);

// ....................Jobs................

// POST / ADD Jobs
router.post("/add-jobs", isAuthenticated,addjobs);

// POST / Edit Jobs
router.post("/edit-jobs/:jobid", isAuthenticated,editjobs);

// POST / delete Jobs
router.post("/delete-jobs/:jobid", isAuthenticated,deletejobs); 

// ....................internships................

// POST / ADD internships
router.post("/add-internships", isAuthenticated,addinternships);

// POST / Edit internships
router.post("/edit-internships/:internid", isAuthenticated,editinternships);

// POST / delete internships
router.post("/delete-internships/:internid", isAuthenticated,deleteinternships); 

// ....................responsibilities................

// POST / ADD responsibilities
router.post("/add-responsibilities", isAuthenticated,addresponsibilities);

// POST / Edit responsibilities
router.post("/edit-responsibilities/:respid", isAuthenticated,editresponsibilities);

// POST / delete responsibilities
router.post("/delete-responsibilities/:respid", isAuthenticated,deleteresponsibilities); 

// ....................courses................

// POST / ADD courses
router.post("/add-courses", isAuthenticated,addcourses);

// POST / Edit courses
router.post("/edit-courses/:courseid", isAuthenticated,editcourses);

// POST / delete courses
router.post("/delete-courses/:courseid", isAuthenticated,deletecourses); 

// ....................projects................

// POST / ADD projects
router.post("/add-projects", isAuthenticated,addprojects);

// POST / Edit projects
router.post("/edit-projects/:projectid", isAuthenticated,editprojects);

// POST / delete projects
router.post("/delete-projects/:projectid", isAuthenticated,deleteprojects); 

// ....................skills................

// POST / ADD skills
router.post("/add-skills", isAuthenticated,addskills);

// POST / Edit skills
router.post("/edit-skills/:skillid", isAuthenticated,editskills);

// POST / delete skills
router.post("/delete-skills/:skillid", isAuthenticated,deleteskills); 

// ....................accomplishments................

// POST / ADD accomplishments
router.post("/add-accomplishments", isAuthenticated,addaccomplishments);

// POST / Edit accomplishments
router.post("/edit-accomplishments/:accid", isAuthenticated,editaccomplishments);

// POST / delete accomplishments
router.post("/delete-accomplishments/:accid", isAuthenticated,deleteaccomplishments); 

module.exports = router;