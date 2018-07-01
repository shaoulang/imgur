const { concat } = require('lodash');
const Path = require('path-parser');
var moment = require('moment');
const { URL } = require('url');
const mongoose = require('mongoose');

const User = mongoose.model('users');
const Events = mongoose.model('events');

module.exports = app => {

  app.post('/api/join_event/:id', (req, res) => {
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
        joined_event: [req.params.id]
      });

    Events.findById(req.params.id, (error, event) => {
      if ((error || {} ).name == 'CastError' && (error || {} ).kind == 'ObjectId') {
        res.send('No event match the ID.');
      } else if (error) {
        res.send(error.message)
      } else {

        user.save((error, newUser) => {
          if (error) {
            res.send(error);
          } else {
            const joined = {
              id        : newUser._id,
              name      : newUser.name,
              phone     : newUser.phone,
              role      : 'Volunteer',
              group     : 'N/a'
            } 
            let newList = concat(event.volunteers, joined);
            
            Events.update(
              { _id: req.params.id },
              { volunteers : newList },
              (error, event) => {
      
                if (error){
                  res.send(error);
                } else {
                  res.send({
                    message: `New volunteer is successfully registered and joine event - ${event.name}`,
                    volunteer: newUser
                  });
                }
              }
            )
          }

        });

      }
    })
  });

};