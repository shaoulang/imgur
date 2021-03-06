const _ = require('lodash');
const Path = require('path-parser');
var moment = require('moment');
const { URL } = require('url');
const mongoose = require('mongoose');

const User = mongoose.model('users');

module.exports = app => {
  
  
  app.get('/api/volunteers', (req, res) => {
    var limit     = parseInt(req.query.limit);
    var page      = parseInt(req.query.page);
    var query     = {};
    (req.query.gender) ? query.gender = req.query.gender : null;
    (req.query.shirt_size) ? query.shirt_size = req.query.shirt_size : null;
    (req.query.keyword) ? query.name = new RegExp(req.query.keyword, 'i') : null;

    User.find(query)
      .limit(limit)
      .skip(limit * (page - 1))
      .exec((err, users) => {
        res.send({
          page,
          limit,
          count: users.length,
          users
        });
    })
  });

  app.get('/api/volunteers/:id', (req, res) => {
    User.findOne({ _id: req.params.id }, (error, user) => {
      res.send(user);
    })
  });

  app.post('/api/volunteers', (req, res) => {
    const { first_name, last_name, ic, birthday, gender,
      shirt_size, occupation, school, phone, email,
      address, current_address, facebook, instagram, health,
      emergency_contact, volunteer_interest } = req.body;

    const user = new User({
      first_name,
      last_name,
      name: first_name + ' ' + last_name,
      ic,
      birthday: moment(birthday, 'DD/MM/YYYY').format('DD/MM/YYYY'),
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
        vegetarian: (health || {}).vegetarian || false,
        allergy: (health || {}).allergy || ['None'],
        illness: (health || {}).illness || ['None'],
      },
      emergency_contact: {
        name: (emergency_contact || {}).name,
        relationship: (emergency_contact || {}).relationship,
        phone: (emergency_contact || {}).phone
      },
      volunteer_interest,
      joined_event: []
    });

    user.save((error, newUser) => {
      if (error) {
        res.send(error);
      } else {
        res.send(newUser);
      }
    });

  });

  app.put('/api/volunteers/:id', (req, res) => {
    const { first_name, last_name, ic, birthday, gender,
      shirt_size, occupation, school, phone, email,
      address, current_address, facebook, instagram, health,
      emergency_contact, volunteer_interest } = req.body;

    const user = {
      first_name,
      last_name,
      name            : first_name + ' ' + last_name,
      ic,
      birthday        :  moment(birthday, 'DD/MM/YYYY').format('DD/MM/YYYY'),
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
      health            : {
        vegetarian    : (health || {}).vegetarian || false,
        allergy       : (health || {}).allergy || ['None'],
        illness       : (health || {}).illness || ['None'],
      },
      emergency_contact : {
        name          : (emergency_contact || {}).name,
        relationship  : (emergency_contact || {}).relationship,
        phone         : (emergency_contact || {}).phone
      },
      volunteer_interest
    };

    User.findByIdAndUpdate( 
      { _id: req.params.id }, //id
      user, //the changes made
      {new: true}, // asks mongoose to return the updated document instead of the pre-updated.
      (error, user) => {

        if (error){
          res.send(error);
        } else {
          user.save();
          res.send(user);
        }
      }
    )
  });

  app.delete('/api/volunteers/:id', (req, res) => {
    User.findByIdAndRemove({ _id: req.params.id }, (error, user) => {
      if (error) {
        res.send(error);
      } else {
        res.send({
          message : 'Successfully deleted volunteer.',
          id      : user._id
        });
      }
    })
  });

};