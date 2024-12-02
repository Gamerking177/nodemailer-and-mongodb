const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  isVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', UserSchema);
