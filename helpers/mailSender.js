import nodemailer from 'nodemailer';

const sendEmail = async (subscriberMail, letterSubject, letterHtml) => {
    let transporter = nodemailer.createTransport({
        service: process.env.MAIL_SERVICE,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.MAIL_USER,
        to: subscriberMail,
        subject: letterSubject,
        html: letterHtml,
    };

    const result = await transporter.sendMail(mailOptions);

    return result;
};

export default sendEmail;
