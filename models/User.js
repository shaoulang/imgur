const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  //personal info
  first_name: String,
  last_name: String,
  name: String,
  ic: String,
  birthday: String,
  gender: String,
  shirt_size: String,
  //occupation
  occupation: String,
  school: String,
  //contacts
  phone: String,
  email: String,
  address: String,
  current_address: String,
  facebook: String,
  instagram: String,
  //in case of emergency
  health: {
    vegetarian: Boolean,
    allergy: [String],
    illness: String
  },
  emergency_contact: {
    name: String,
    relationship: String,
    phone: String
  },
  //interest
  volunteer_interest: [String],
  //Events
  joined_event: [{ type: Schema.Types.ObjectId , ref: 'Events'}],
  //system info
  registerDate: { type: Date, default: Date.now },
});

mongoose.model('users', userSchema);
