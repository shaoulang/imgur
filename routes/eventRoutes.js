const { map, concat, remove, assign } = require('lodash');
const Path = require('path-parser');
var moment = require('moment');
const { URL } = require('url');
const mongoose = require('mongoose');
const metascraper = require('metascraper');
const got = require('got');

const Events = mongoose.model('events');

module.exports = app => {
  
  app.get('/api/events', (req, res) => {
    var limit     = parseInt(req.query.limit);
    var page      = parseInt(req.query.page);
    var query     = {};
    (req.query.gender) ? query.gender = req.query.gender : null;
    (req.query.shirt_size) ? query.shirt_size = req.query.shirt_size : null;
    (req.query.keyword) ? query.name = new RegExp(req.query.keyword, 'i') : null;

    Events.find(query)
      .limit(limit)
      .skip(limit * (page - 1))
      .exec((err, events) => {
        res.send({
          page,
          limit,
          count: events.length,
          events
        });
    })
  });

  app.get('/api/events/:id', (req, res) => {
    Events.findOne({ _id: req.params.id }, (error, event) => {
      res.send(event);
    })
  });

  app.post('/api/events', (req, res) => {
    const { name, location, date, desc, fees } = req.body;

    const event = new Events({
      name,
      location,
      date          : moment(date, 'DD/MM/YYYY').format('DD/MM/YYYY'),
      desc,
      programme     : [],
      volunteers    : [],
      participants  : [],
      fees          : fees.map(fee => ({
        category  : fee.category,
        amount    : fee.amount
      })),
    });

    try {
      event.save();
      res.send(event);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.put('/api/events/:id', (req, res) => {
    const { name, location, date, desc, fees } = req.body;

    const event = {
      name,
      location,
      date          : moment(date, 'DD/MM/YYYY').format('DD/MM/YYYY'),
      desc,
      programme     : [],
      volunteers    : [],
      participants  : [],
      fees          : fees.map(fee => ({
        category  : fee.category,
        amount    : fee.amount
      }))
    };

    Events.findByIdAndUpdate( 
      { _id: req.params.id }, //id
      event, //the changes made
      {new: true}, // asks mongoose to return the updated document instead of the pre-updated.
      (error, event) => {

        if (error){
          res.send(error);
        } else {
          event.save();
          res.send(event);
        }
      }
    )
  });

  app.delete('/api/events/:id', (req, res) => {
    Events.findByIdAndRemove({ _id: req.params.id }, (error, event) => {
      if (error) {
        res.send(error);
      } else {
        res.send({
          message : 'Successfully deleted event.',
          id      : event._id
        });
      }
    })
  });

////////////////////////////Participants///////////////////////////////////

  app.get('/api/events/:id/participants', (req, res) => {
    Events.findOne({ _id: req.params.id }, (error, event) => {
      res.send(event.participants);
    })
  });

  app.post('/api/events/:id/participants', (req, res) => {
    const { participants } = req.body;

    const list = participants.map(participant => ({ 
      name              : participant.name,
      age               : participant.age,
      home              : participant.home,
      vegetarian        : participant.vegetarian,
      allergy           : participant.allergy,
      emergency_contact : {
        name          : (participant.emergency_contact || {} ).name,
        relationship  : (participant.emergency_contact || {} ).relationship,
        phone         : (participant.emergency_contact || {} ).phone
      }
    }));


    Events.findOne({ _id: req.params.id }, (error, event) => {
    	let newList = concat(event.participants, list);

	    Events.update(
	      { _id: req.params.id },
	      { participants : newList },
	      (error, event) => {

	        if (error){
	          res.send(error);
	        } else {
	          res.send(event);
	        }
	      }
	    )
    })
  });

  app.put('/api/events/:id/participants/:pid', (req, res) => {
    const { name, age, home, vegetarian, allergy, emergency_contact } = req.body;

    const newData = { 
      name,
      age,
      home,
      vegetarian,
      allergy,
      emergency_contact : {
        name          : (emergency_contact || {} ).name,
        relationship  : (emergency_contact || {} ).relationship,
        phone         : (emergency_contact || {} ).phone
      }
    };

    Events.findOne({ _id: req.params.id }, (error, event) => {
    	let list = event.participants;
    	let oldList = remove(list, p => {
    		return (p._id == `${req.params.pid}`) ? p : null;
      });
      
      oldList = assign(oldList[0], newData);

      let newList = concat(list, oldList);

	    Events.update(
	      { _id: req.params.id },
	      { participants : newList },
	      (error, event) => {

	        if (error){
	          res.send(error);
	        } else {
	          res.send(event);
	        }
	      }
	    )
    })
  });

  app.delete('/api/events/:id/participants/:pid', (req, res) => {

    Events.findOne({ _id: req.params.id }, (error, event) => {
    	let list = event.participants;
    	let oldList = remove(list, p => {
    		return (p._id == `${req.params.pid}`) ? p : null;
    	});

	    Events.update(
	      { _id: req.params.id },
	      { participants : list },
	      (error, event) => {

	        if (error){
	          res.send(error);
	        } else {
	          res.send(event);
	        }
	      }
	    )
    })
  });

};