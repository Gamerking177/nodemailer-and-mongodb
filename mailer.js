require('dotenv').config();

const nodemailer = require('nodemailer');

// Transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail', // Or your email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Example email sending function
const sendEmail = async (to, subject, htmlContent) => {
  try {
    const mailOptions = {
      from: `"CIMAGE" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;
