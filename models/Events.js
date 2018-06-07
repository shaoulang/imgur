const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
  //info
  name          : String,
  location      : String,
  date          : Date,
  desc          : String,
  programme     : [{
    time      : String,
    activity  : String,
    desc      : String
  }],
  volunteers    : [{ 
    id    : {type: Schema.Types.ObjectId , ref: 'User'},
    name  : String,
    paid  : { type: Boolean, default: false}
  }],
  participants  : [{ 
    name      : String,
    age       : Number,
    home      : String,
    emergency_contact  : {
      name: String,
      relationship: String,
      phone: String
    }
  }]
  //system info
  registerDate: { type: Date, default: Date.now },
});

mongoose.model('events', eventSchema);
