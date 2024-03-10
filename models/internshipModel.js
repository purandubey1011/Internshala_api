const mongoose = require("mongoose");

const internshipModel  = new mongoose.Schema({
    students:{type:mongoose.Schema.Types.ObjectId,ref:"student"},
    employe:{type:mongoose.Schema.Types.ObjectId,ref:"employe"},
    profile:String,
    skill:String,
    internshiptype:{type:String,
        // enum:["In Office" , "Remote"]
    },
    openings:Number,
    internshipStartDate:String,
    internshipEndDate:String,
    internshipDuration:String,
    responsibilities:String,
    stipend:{
       status:{
        type:String,
        // enum:["Fixed" , "Negotiable" , "Performance Base","Unpaid"]
       },
       amount:Number,
    },
    perks:String,
    assesments:String,
    city:String,
    time :String
    },
{timestamps:true} 
);
const Internship = mongoose.model("internship",internshipModel);

module.exports = Internship;