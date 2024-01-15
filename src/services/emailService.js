const nodemailer = require("nodemailer");
require("dotenv").config();

// const secret = process.env.SECRET;
// const BASE_URL = process.env.BASE_URL;
// const OutlookEmail = process.env.OUTLOOK_EMAIL;
// const OutlookPassword = process.env.OUTLOOK_PASSWORD;

const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.OUTLOOK_EMAIL,
      pass: process.env.OUTLOOK_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.OUTLOOK_EMAIL,
    to: email,
    subject: "Email verification",
    html: `<p>Click on the following link: <mark><a target="_blank" href="${process.env.BASE_URL}/api/verify/${verificationToken}">Click Here</a></mark> to verify your email address!</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    // throw error;
  }
};

module.exports = {
  sendVerificationEmail,
};
