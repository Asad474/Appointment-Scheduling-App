import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.HOST_EMAIL,
        pass: process.env.HOST_PASSWORD,
    },
});

export default transporter;