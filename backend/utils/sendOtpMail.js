// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.Email,
//     pass: process.env.app_pass,
//   },
// });

// const sendOtpMail = async (email, otp) => {
//   const mailOptions = {
//     from: "freeapiuse@gmail.com",
//     to: email,
//     subject: "Your OTP Code",
//     html: `<p>Your OTP is <b>${otp}</b>. It is valid for 5 minutes.</p>`
//   };

//   await transporter.sendMail(mailOptions);
// };

// module.exports = sendOtpMail;

const { BrevoClient } = require("@getbrevo/brevo");

const sendOtpMail = async (email, otp) => {
    const client = new BrevoClient({
        apiKey: process.env.BREVO_API_KEY,
    });

    try {
        await client.transactionalEmails.sendTransacEmail({
            sender: { 
                email: "freeapiuse2@gmail.com", 
                name: "TradeNest" 
            },
            to: [{ email: email }],
            subject: "Your OTP Code",
            htmlContent: `<p>Your OTP is <b>${otp}</b>. It is valid for 5 minutes.</p>`,
        });
    } catch (error) {
        console.error("Brevo SDK Error:", error);
        throw error;
    }
};

module.exports = sendOtpMail;