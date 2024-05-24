const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,
  bio: String,
  phone: String,
  photo: String,
  isPublic: { type: Boolean, default: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
