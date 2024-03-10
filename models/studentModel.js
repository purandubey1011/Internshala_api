const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const studentModel = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Firstname is required"],
        minLength: [4, "First Name Should be Atleast 4 Characters Long"],
    },
    lastname: {
        type: String,
        required: [true, "lastname is required"],
        minLength: [4, "last Name Should be Atleast 4 Characters Long"],
    },
    contact: {
        type: String,
        required: [true, "Contact is required"],
        maxLength: [10, "Contact must not exceed 10 character"],
        minLength: [10, "Contact should be atleast 10 character long"],
    },
    city: {
        type: String,
        required: [true, "city name is required"],
        minLength: [3, "City should be atleast 3 character long"],
    },
    gender: {
        type: String,
        required: [true, "gender is required"],
        enum: ["male", "female", "others"],

    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is Required"],
        // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        select: false,
        maxLength: [15, "Password should more than 15 Characters"],
        minLength: [6, "Password should have atleast 15 Characters"],
        //     match:[/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/,"Please fill a strong password"//special/number/capital
        // ],
    },
    resetPasswordToken: {
        type: String,
        default: "0",
    },
    avatar: {
        type: Object,
        fileId: "",
        url: "https://images.unsplash.com/photo-1702478492816-843fb767d0f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHN1bmRhciUyMGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D"
    },
    resume: {
        education: {type:Array,default:[]},
        jobs: {type:Array,default:[]},
        internships: {type:Array,default:[]},
        responsibilities: {type:Array,default:[]},
        courses: {type:Array,default:[]},
        projects: {type:Array,default:[]},
        skills: {type:Array,default:[]},
        accomplishments: {type:Array,default:[]},
    },
    internships: [
        { type: mongoose.Schema.Types.ObjectId, ref: "internship" }
    ],
    jobs: [
        { type: mongoose.Schema.Types.ObjectId, ref: "job" }
    ],
},
    { timestamps: true }
);
studentModel.pre("save", function () {
    if (!this.isModified("password")) {
        return;
    }
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt)
});

studentModel.methods.comparepassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

studentModel.methods.getjwttoken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};
const student = mongoose.model("student", studentModel);

module.exports = student;