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

//Routes
app.get("/",require("./routes/indexRoutes"));

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