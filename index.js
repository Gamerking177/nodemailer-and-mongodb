const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const sendEmail = require('./mailer');

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const sendEmailsToUsers = async () => {
  try {
    // Fetch all users from MongoDB
    const users = await User.find();

    // Loop through each user and send a personalized email
    for (const user of users) {
      const htmlContent = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 2px solid #0056a8; border-radius: 15px; overflow: hidden;">
    <div style="padding: 25px; text-align: center; color: white;">
      <img src="https://mycareersview.com/afile/mcv25549_CIMAGE-Group-of-Institution.png" alt="CIMAGE Logo" style="max-width: 100%; margin-bottom: 15px;" />
      <h1 style="margin: 0; font-size: 36px;">Transfer Information</h1>
    </div>
    <div style="padding: 25px; background-color: #ffffff;">
      <h2 style="color: #0056a8; text-align: center;">Dear ${user.name},</h2>
      <p style="font-size: 18px; color: #333; text-align: center;">
        We would like to inform you that you are successfully transferred to <strong>BCA-PPU-2ND YEAR-BATCH-1</strong>. Thank you!
      </p>
      <div style="text-align: center; margin: 20px;">
        <a href="https://cimagecollege.com/" style="background-color: #e63946; color: white; text-decoration: none; padding: 15px 30px; border-radius: 10px; font-size: 18px;">
          Visit Now
        </a>
      </div>
    </div>
    <div style="padding: 20px; text-align: center; color: white; font-size: 14px;">
      <p><strong>CIMAGE</strong></p>
      <p>S.K. Puri Park, Boring Road, Patna • 9835024444</p>
      <p>Email: <a href="mailto:info@cimage.in" style="color: #fff; text-decoration: underline;">info@cimage.in</a> • <a href="https://cimagecollege.com/" style="color: #fff; text-decoration: underline;">https://cimagecollege.com/</a></p>
    </div>
    <div style="padding: 20px; background: linear-gradient(90deg, #4facfe, #00f2fe); text-align: center; color: white; font-size: 14px;">
      <p style="margin: 0;">Stay connected with our community</p>
      <div style="margin-top: 10px;">
        <a href="https://facebook.com" style="margin: 0 10px; text-decoration: none; color: white;">
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="30" height="30">
            <path d="M22.675 0H1.325C.594 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24h11.495v-9.294H9.689v-3.622h3.131V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.795.144v3.241l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.309h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.324-.593 1.324-1.326V1.326C24 .593 23.407 0 22.675 0z" />
          </svg>
        </a>
        <a href="https://twitter.com" style="margin: 0 10px; text-decoration: none; color: white;">
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="30" height="30">
            <path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724 9.865 9.865 0 0 1-3.127 1.184 4.92 4.92 0 0 0-8.384 4.482C7.688 8.095 4.064 6.13 1.64 3.161a4.916 4.916 0 0 0-.666 2.475 4.92 4.92 0 0 0 2.188 4.1 4.904 4.904 0 0 1-2.229-.616v.061a4.923 4.923 0 0 0 3.946 4.827 4.902 4.902 0 0 1-2.224.084 4.923 4.923 0 0 0 4.6 3.42 9.868 9.868 0 0 1-6.102 2.104c-.397 0-.787-.023-1.175-.067A13.94 13.94 0 0 0 7.548 21c9.057 0 14.01-7.512 14.01-14.01 0-.213-.005-.426-.015-.637A10.025 10.025 0 0 0 24 4.557z" />
          </svg>
        </a>
        <a href="https://youtube.com" style="margin: 0 10px; text-decoration: none; color: white;">
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="30" height="30">
            <path d="M19.615 3.184A4.808 4.808 0 0 0 16.228.892C14.275 0 12.001 0 12.001 0s-2.274 0-4.227.892a4.808 4.808 0 0 0-3.387 2.292C3.893 5.228 3.893 8.001 3.893 8.001s0 2.773.493 4.817a4.808 4.808 0 0 0 3.387 2.292c1.953.892 4.227.892 4.227.892s2.274 0 4.227-.892a4.808 4.808 0 0 0 3.387-2.292c.493-2.044.493-4.817.493-4.817s0-2.773-.493-4.817zm-10.615 8.182V6.182l5.623 2.092z" />
          </svg>
        </a>
        <a href="https://linkedin.com" style="margin: 0 10px; text-decoration: none; color: white;">
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="30" height="30">
            <path d="M22.23 0H1.77C.79 0 0 .77 0 1.729v20.542C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.729V1.729C24 .77 23.21 0 22.23 0zM7.118 20.452H3.552V9h3.566zm-1.784-13c-1.14 0-2.07-.92-2.07-2.05a2.072 2.072 0 0 1 2.07-2.05c1.138 0 2.07.92 2.07 2.05s-.932 2.05-2.07 2.05zM20.452 20.452h-3.566v-5.621c0-1.34-.027-3.065-1.868-3.065-1.87 0-2.156 1.46-2.156 2.97v5.716H9.296V9h3.422v1.563h.048c.476-.9 1.635-1.846 3.367-1.846 3.602 0 4.27 2.37 4.27 5.448v6.287z" />
          </svg>
        </a>
      </div>
    </div>
    <div style="padding: 10px; background-color: #ede7f6; text-align: center; color: #666; font-size: 14px;">
      <p>&copy; ${new Date().getFullYear()} CIMAGE Group of Institutions. All rights reserved.</p>
      <p><a href="#" style="color: #0056a8; text-decoration: none;">Terms</a> | <a href="#" style="color: #0056a8; text-decoration: none;">Privacy</a> | <a href="#" style="color: #0056a8; text-decoration: none;">Unsubscribe</a></p>
    </div>
    <div style="text-align: center; padding: 15px; background-color: #ffffff;">
      <img src="https://mycareersview.com/afile/mcv25549_CIMAGE-Group-of-Institution.png" alt="CIMAGE Footer Image" style="max-width: 100%; border-radius: 10px;" />
    </div>
  </div>
`;


      // Send the email to the individual user
      await sendEmail(user.email, 'Transfer Information', htmlContent);
      console.log(`Email sent to ${user.name} (${user.email})`);
    }

    console.log('All personalized emails sent successfully');
  } catch (error) {
    console.error('Error sending emails:', error);
  }
};


// Trigger email sending
sendEmailsToUsers();