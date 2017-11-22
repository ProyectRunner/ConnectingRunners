const express = require ('express');
const Event = require("../models/Event");
const User = require("../models/User");
const RelUserEvent = require("../models/RelUserEvent");
const eventsRoutes = express.Router();
const { ensureLoggedIn }  = require('connect-ensure-login');
// const EventController = require("../controllers/EventController");

const multer  = require('multer');
const upload = multer({dest:'./public/uploads'});

//Show events list

eventsRoutes.get('/events/list', (req, res, next) => {
  Event.find({}, (err, events) => {
    if (err) { return next(err); }

    res.render('events/list', {
      events: events
    });
  });
});

//Create events

eventsRoutes.get('/events/create', (req, res, next) => {
  res.render('events/create');
});

eventsRoutes.post('/events/create', [ensureLoggedIn('/auth/login'), upload.single('imgUrl')], (req, res, next) => {
  const {eventName, description, date, website, place, imgUrl, lat, log} = req.body;
  const createEvent = new Event ({
    eventName, description, date, website, place, lat, log,
    imgUrl: req.file.filename,
    creator: req.user._id
  });
  createEvent.save()
    .then(event => {
      console.log(event);
    res.redirect(`/events/${event._id}`);
  }).catch(err => res.render('events/create', { event:createEvent}));
});

//Show Event's Details

eventsRoutes.get('/events/:id', (req, res, next) => {
  const eventId = req.params.id;

  Event.findById(eventId, (err, event) => {
      if (err) { return next(err); }
      res.render('events/details', { event: event });
    });
});

// Edit events

eventsRoutes.get('/events/:id/edit', ensureLoggedIn('/auth/login'), (req, res, next) => {
  Event.findById(req.params.id)
  .then(event =>{
    res.render('events/edit', {event: event});
  })
  .catch(e => next(e));
});

const ensureOwnerEdits = (req,res,next) =>{
  Event.findById(req.params.id)
  .populate('creator')
  .then(event =>{
    console.log(event);
    if(req.user._id.equals(event.creator._id)){
      return next();
    };
    throw new Error("No eres el propietario del evento");
  })
  .catch(e => {
    console.error(e);
    res.redirect('/events/'+req.params.id);
  });
};

eventsRoutes.post('/events/:id/edit', [ensureLoggedIn('/auth/login'), ensureOwnerEdits, upload.single('imgUrl')], (req, res, next) => {
  console.log(req.body);
  const {eventName, description, date, website, place, lat, log} = req.body;
  let imgUrl = '';
  if (req.file) {
    imgUrl = req.file.filename;
  } else {
    imgUrl = res.locals.event.imgUrl;
  }
  const updates = {
    eventName, description, date, website, place, lat, log, imgUrl };
  Event.findByIdAndUpdate(req.params.id, updates)
  .then(event => res.redirect(`/events/${req.params.id}`))
  .catch(e => {
    console.log(e);
    res.render('events/edit', {
      event:updates,
      error: e.message
    });
  });
});

//Delete Event

eventsRoutes.post('/events/:id/delete', (req, res, next) => {
  const id = req.params.id;

  Event.findByIdAndRemove(id, (err, event) => {
    if (err){ return next(err); }
    return res.redirect('/events/list');
  });

});


//Join user
eventsRoutes.post('/events/join/:id', (req, res, next) => {
  const eventId = req.params.id;
  const userId = req.user._id;

  const newUserJoin = new RelUserEvent({
    eventId, userId });
    newUserJoin.save()
      .then(join => {
        console.log(join);
      res.redirect(`/events/${join.eventId}`);
    }).catch(err => res.render('events/details'));


});



module.exports = eventsRoutes;
