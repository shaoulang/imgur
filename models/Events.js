const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
  //info
  name          : String,
  location      : String,
  date          : String,
  desc          : String,
  programme     : [{
    time      : String,
    activity  : String,
    desc      : String
  }],
  volunteers    : [{ 
    id        : { type: Schema.Types.ObjectId , ref: 'User' },
    name      : String,
    paid      : { type: Boolean, default: false }
  }],
  participants  : [{ 
    name      : String,
    age       : Number,
    home      : String,
    vegetarian: Boolean,
    allergy   : [String],
    emergency_contact  : {
      name: String,
      relationship: String,
      phone: String
    }
  }],
  fees:[{
    category: String,
    amount: Number
  }],
  //system info
  createdDate: { type: Date, default: Date.now },
});

mongoose.model('events', eventSchema);
