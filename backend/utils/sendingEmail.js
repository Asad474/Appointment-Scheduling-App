import transporter from "../config/emailConfig.js";

const sendMail = async(res, userEmail, subject, text) => {
    const mailOptions = {
        from: process.env.HOST_EMAIL,
        to: userEmail,
        subject,
        text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error){
            res.status(400);
            throw new Error('Mail has not reached to the reciever.');
        } else{
            console.log(`Email sent : ${info.response}`);            
        };
    });
};

export default sendMail;