const mongoose = require("mongoose");

const studentModel  = new mongoose.Schema({
email:{
    type:String,
    unique:true,
    required:[true,"Email is Required"],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
},
password:{
    type:String,
    select:false,
    maxLength:[15,"Password should more than 15 Characters"],
    minLength:[6,"Password should have atleast 15 Characters"],
//     match:[/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/,"Please fill a strong password"//special/number/capital
// ],
        },
    },
{timestamps:true}
);

studentModel.pre("save",function(){

    if(!this.isModified("password")){
        return;
    }
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password,salt);
})

studentModel.methods.comparepassword = function(password) {
    return bcrypt.compareSync(password, this.password)
}
const student = mongoose.model("student",studentModel);

module.exports = student;