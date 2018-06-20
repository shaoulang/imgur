const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
  //info
  name          : String,
  location      : String,
  date          : String,
  desc          : String,
  //operations
  programme     : [{
    time      : String,
    activity  : String,
    desc      : { type: String, default: '' },
    remark    : { type: String, default: '' }
  }],
  transportation: [{
    for       : String,
    driver    : String,
    phone     : String,
    fees      : { type: Number, default: 0 },
    remark    : { type: String, default: '' }
  }],
  catering      : [{
    meal      : String,
    items     : [String],
    venue     : String,
    budget    : Number,
    time_ready: String,
    phone     : String,
    remark    : { type: String, default: '' }
  }],
  documents      : [{
    name      : String,
    link      : String
  }],
  //Volunteers
  dress_code    : { type: String, default: 'Event shirt, long pants, covered shoes' },
  volunteers    : [{ 
    id        : { type: Schema.Types.ObjectId , ref: 'User' },
    name      : String,
    phone     : String,
    paid      : { type: Boolean, default: false },
    role      : String,
    group     : String
  }],
  fees:[{
    category: String,
    amount: { type: Number, default: 0 }
  }],
  //participants
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
  //system info
  createdDate: { type: Date, default: Date.now },
});

mongoose.model('events', eventSchema);
