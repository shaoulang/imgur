const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');

const Survey = mongoose.model('surveys');

module.exports = app => {

  app.post('/api/volunteers', (req, res) => {
    const { first_name, last_name, ic, birthday, gender,
      shirt_size, occupation, school, phone, email,
      address, current_address, facebook, instagram, health: 
      emergency_contact, volunteer_interest } = req.body;

    const survey = new Survey({
      first_name,
      last_name,
      ic,
      birthday,
      gender,
      shirt_size,
      occupation,
      school,
      phone,
      email,
      address,
      current_address,
      facebook,
      instagram,
      health: {
        vegetarian,
        allergy: [String],
        illness
      },
      emergency_contact: {
        name,
        relationship,
        phone
      },
      volunteer_interest
    });
  });
};