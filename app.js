require("dotenv").config({path:"./.env"});
const express = require("express")
const app = express();

//db Connection
require("./models/database").connectDatabase();
// const PORT = 3030;

//logger
const logger = require("morgan");
const ErrorHandler = require("./utils/ErrorHandler");
app.use(logger("tiny"));

// bodyparser
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//session and cookie
const session = require("express-session");
const cookieparser = require("cookie-parser");
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:process.env.EXPRESS_SESSION_SECRET,
}));
app.use(cookieparser());
// express file-upload
const fileupload = require("express-fileupload");
app.use(fileupload());

//Routes
app.use("/user",require("./routes/indexRoutes"));
app.use("/resume",require("./routes/resumeRoutes"));
app.use("/employe",require("./routes/employeRoutes"));

// app.get("/",require("./routes/indexRoutes"));
// app.post("/student/signup", require("./routes/indexRoutes"))
// app.post("/student/signin", require("./routes/indexRoutes"))
// app.get("/student/signout",require("./routes/indexRoutes"));
// app.post("/student",require("./routes/indexRoutes"));
// app.post("/student/send-mail",require("./routes/indexRoutes"));
// app.get("/student/forget-link/:id",require("./routes/indexRoutes"));
// app.post("/student/reset-password/:id",require("./routes/indexRoutes"));
// app.post("/student/update/:id",require("./routes/indexRoutes"));
// app.post("/student/avatar/:id",require("./routes/indexRoutes"));


//Error Handling
const {generatedErrors} = require("./middlewares/errors.js");
app.all("*",(req,res,next)=>{
    next(new ErrorHandler(`Requested Url Not Found ${req.url}`,404));
});

app.use(generatedErrors);

app.listen(
    process.env.PORT,
    console.log(`Server running on port ${process.env.PORT}`)
    );