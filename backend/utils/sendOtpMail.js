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

const brevo = require('@getbrevo/brevo');

const sendOtpMail = async (email, otp) => {
  console.log("Brevo Library Keys:", Object.keys(brevo));
    let apiInstance = new brevo.TransactionalEmailsApi();
    let apiKey = apiInstance.authentications['apiKey'];
    apiKey.apiKey = process.env.BREVO_API_KEY; 

    let sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.sender = { "name": "TradeNest", "email": "freeapiuse2@gmail.com" };
    sendSmtpEmail.to = [{ "email": email }];
    sendSmtpEmail.subject = "Your OTP Code";
    sendSmtpEmail.htmlContent = `<p>Your OTP is <b>${otp}</b>. It is valid for 5 minutes.</p>`;

    try {
        await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log("Email sent successfully via Brevo API");
    } catch (error) {
        console.error("Brevo API Error Details:", error.response ? JSON.stringify(error.response.body, null, 2) : error);
        throw error;
    }
};

module.exports = sendOtpMail;