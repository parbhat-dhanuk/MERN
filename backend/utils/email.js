import nodemailer from "nodemailer"

 const sendEmail=async (options)=>{
try {
    var transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        }
    })
    const mailOptions = {
            from: "Parbhat Dhanuk <parbhatdhnauk3@gmail.com>",
            to: options.email,
            subject: options.subject,
            text: options.message,
          };
    await transporter.sendMail(mailOptions)
} catch (error) {
    console.log(error)
}
}

export default sendEmail