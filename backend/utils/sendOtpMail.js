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

const nodemailer = require("nodemailer");

const sendOtpMail = async (email, otp) => {
  let transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, 
    auth: {
      user: process.env.BREVO_USER, 
      pass: process.env.BREVO_PASS, 
    },
  });

  await transporter.sendMail({
    from: '"TradeNest" <freeapiuse2@gmail.com>', 
    to: email,
    subject: "Your OTP Code",
    html: `<p>Your OTP is <b>${otp}</b>. It is valid for 5 minutes.</p>`,
  });
};

module.exports = sendOtpMail;