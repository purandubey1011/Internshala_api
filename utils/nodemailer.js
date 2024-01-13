const nodemailer = require("nodemailer");
const ErrorHandler = require("./ErrorHandler");

exports.sendMail = (req,res,next,url)=>{
    const transport = nodemailer.createTransport({
        service:"gmail",
        host:"smtp.gamil.com",
        port:465,
        auth:{
            user:process.env.MAIL_EMAIL_ADDRESS,
            pass:process.env.MAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from : "vikash pvt. ltd.<vikashpal1039@gmail.com",
        to:req.body.email,
        subject:"password Reset Link",
        html:`<h1>click link below to reset password</h1>
              <a href="${url}""> Password Reset Link </a> `

    } ;
    transport.sendMail(mailOptions,(err,info,next) =>{
        if (err) return next(new ErrorHandler(err, 500));
       console.log(info);
       return   res.status(200).json({
        message:"mail sent Succesfully",
        url,
       })
    })
}