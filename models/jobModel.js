 const mongoose = require("mongoose");

const jobModel  = new mongoose.Schema({
    students:{type:mongoose.Schema.Types.ObjectId,ref:"student"},
    employe:{type:mongoose.Schema.Types.ObjectId,ref:"employe"},
    profile:String,
    skill:String,
    jobtype:{
        type:String,
        // enum:["In Office" , "Remote"]
    },
    city:String,
    openings:Number,
    StartDate:String,
    EndDate:String,
    Duration:String,
    description:String,
    preferences:String,
    salary:Number,
    perks:String,
    assesments:String,
    time:String
    },
{timestamps:true}
);
const Job = mongoose.model("job",jobModel);

module.exports = Job;