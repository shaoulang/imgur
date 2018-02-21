const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  name: String,
  birthday: Date,
  registerDate: { type: Date, default: Date.now },
});

mongoose.model('users', userSchema);
