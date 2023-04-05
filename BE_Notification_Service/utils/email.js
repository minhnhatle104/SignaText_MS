import * as dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

export default function(userEmail, subject, message) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'webnc19ktpm@gmail.com',
            pass: 'ujgcbstbwjoadsen'
        },
        secure: true,
        tls: {
            rejectUnauthorized: false,
        },
    });

    const mailOptions = {
        from: 'SignaText',
        to: userEmail,
        subject,
        text: message
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
