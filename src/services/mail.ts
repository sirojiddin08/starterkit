import nodemailer from "nodemailer";

const { MAIL_USER, MAIL_APP_PASS } = process.env;

const mailTransporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: MAIL_USER as string,
        pass: MAIL_APP_PASS as string,
    },
});

const sendMail = async (to: string, subject: string, text: string): Promise<void> => {
    try {
        await mailTransporter.sendMail({
            from: `"Landing Page" <${MAIL_USER}>`,
            to,
            subject,
            text,
        });
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

export default sendMail;

// const sendMail = require("./utils/mail");
// sendMail("vorisrakhimov17@gmail.com", "Test email", "This is a test email from the server");