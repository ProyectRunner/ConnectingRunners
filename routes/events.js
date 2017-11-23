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
  Event.find().populate("creator")
    .then(result => {
      console.log("8========D---3  entrando");
      console.log(result);
      console.log(req.user);
      res.render('events/list', {events:result , user: req.user});
    })
    .catch(err => next (err));
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

  Event.findById(eventId)
    .then(event =>{
      res.render('events/details', { event: event });
    })
    .catch(err => next(err));
});

// Edit events
const ensureOwner = (req,res,next) =>{
  Event.findById(req.params.id)
  .populate('creator')
  .then(event =>{
    console.log("entro... probando" + event);
    if(req.user._id == event.creator._id){
      return next();
    };
    throw new Error("No eres el propietario del evento");
  })
  .catch(err => {
    console.error(err);
    res.redirect('/events/'+req.params.id);
  });
};

eventsRoutes.get('/events/:id/edit', ensureLoggedIn('/auth/login'), ensureOwner, (req, res, next) => {
  Event.findById(req.params.id)
  .then(event =>{
    res.render('events/edit', {event: event});
  })
  .catch(err => next(err));
});


eventsRoutes.post('/events/:id/edit', [ensureLoggedIn('/auth/login'), upload.single('imgUrl')], (req, res, next) => {
  const {eventName, description, date, website, place, lat, log} = req.body;
  let imgUrl = '';
  if (req.file) {
    imgUrl = req.file.filename;
  } else {
    imgUrl = res.locals.user.imgUrl;
  }
  const updates = {
    eventName, description, date, website, place, lat, log, imgUrl};

  Event.findByIdAndUpdate(req.params.id, updates)
  .then(event => res.redirect(`/events/${req.params.id}`))
  .catch(err => {
    console.log(err);
    res.render('events/edit', {
      event:updates,
      error: e.message
    });
  });
});

//Delete Event

eventsRoutes.post('/events/:id/delete', [ensureLoggedIn('/auth/login'), ensureOwner], (req, res, next) => {
  const id = req.params.id;
  Event.findByIdAndRemove(id)
    .then(event => res.redirect('/events/list'))
    .catch(err => next(err));
});


//Join user to event
eventsRoutes.post('/events/join/:id', [ensureLoggedIn('/auth/login')], (req, res, next) => {
  const eventId = req.params.id;
  const userId = req.user._id;

  const newUserJoin = new RelUserEvent({
    eventId, userId });
    newUserJoin.save()
      .then(join => {
        res.redirect(`/events/join/myevent/${join._id}`);
      })
    .catch(err => res.render('events/details'));
});

eventsRoutes.get('/events/join/myevent/:id', [ensureLoggedIn('/auth/login')], (req, res, next) =>{
    const joinId = req.params.id;

    RelUserEvent.findById(joinId)
      .populate('eventId')
      .populate('userId')
      .then(join =>{
        console.log('8=========3'+ join);
        res.render('events/join-ok', {join});
      })
      .catch(err => next(err));
});

// Unjoin user to event

eventsRoutes.post('/events/join/:id/delete'), [ensureLoggedIn('/auth/login')], (req, res, next) =>{
    const id = req.params.id;
    Event.findByIdAndRemove(id)
    .then(event => res.redirect('/events/details'))
    .catch(err => next(err));
};

// eventsRoutes.get('/events/unjoin/myevent/:id', [ensureLoggedIn('/auth/login')], (req, res, next) =>{
//     const joinId = req.params.id;
//
//     RelUserEvent.findById(joinId)
//       .populate('eventId')
//       .populate('userId')
//       .then(join =>{
//         console.log('8=========3'+ join);
//         res.render('events/join-ok', {join});
//       })
//       .catch(err => next(err));
// });

module.exports = eventsRoutes;
