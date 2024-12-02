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
          <div style="font-family: 'Comic Sans MS', Arial, sans-serif; max-width: 600px; margin: auto; border: 2px solid #ff9800; border-radius: 15px; overflow: hidden; background-color: #fffbe7;">
            <div style="background-color: #ffa726; padding: 20px; text-align: center; color: white;">
              <h1 style="margin: 0; font-size: 32px;">Hi ${user.name}! 🎉</h1>
              <p style="margin: 5px 0; font-size: 18px;">Welcome to the gang!</p>
            </div>
            <div style="padding: 20px; background-color: #ffffff;">
              <h2 style="color: #ff6f00; text-align: center;">We’re thrilled to have you here!</h2>
              <p style="font-size: 16px; color: #555; text-align: center;">
                This is where the fun begins! We’re excited to share laughter, adventures, and unforgettable memories with you.
              </p>
              <div style="padding: 10px; text-align: center;">
                <img src="https://example.com/welcome-friend.jpg" alt="Welcome" style="max-width: 100%; border-radius: 10px;" />
              </div>
              <p style="font-size: 16px; color: #555; text-align: center;">
                Don’t wait! Let’s dive in and start making amazing things happen. Click the button below to get started!
              </p>
              <div style="text-align: center; margin: 20px 0;">
                <a href="https://youtu.be/83RUhxsfLWs?si=zzw3HHfuW79BUS3w" style="background-color: #4caf50; color: white; text-decoration: none; padding: 12px 25px; border-radius: 5px; font-size: 18px;">
                  Join the Fun 🚀
                </a>
              </div>
            </div>
            <div style="padding: 20px; background-color: #ffecb3; text-align: center; color: #555; font-size: 14px;">
              <p>Got questions? We’ve got answers! <a href="mailto:support@example.com" style="color: #007bff; text-decoration: none;">Contact Us</a></p>
              <p>&copy; ${new Date().getFullYear()} [Your Fun Service]. Let’s make it awesome! 🎉</p>
            </div>
          </div>
        `;

      // Send the email to the individual user
      await sendEmail(user.email, `Welcome, ${user.name}! 🎉`, htmlContent);
      console.log(`Email sent to ${user.name} (${user.email})`);
    }

    console.log('All personalized emails sent successfully');
  } catch (error) {
    console.error('Error sending emails:', error);
  }
};


// Trigger email sending
sendEmailsToUsers();