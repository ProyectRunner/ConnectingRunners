const express = require ('express');
const Event = require("../models/Event");
const User = require("../models/User");
const RelUserEvent = require("../models/RelUserEvent");
const eventsRoutes = express.Router();
const { ensureLoggedIn }  = require('connect-ensure-login');
// const EventController = require("../controllers/EventController");

const multer  = require('multer');
const upload = multer({dest:'./public/uploads'});

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

//Show events list

eventsRoutes.get('/events/list', (req, res, next) => {
  Event.find().populate("creator")
    .then(result => {
      res.render('events/list', {events:result , user: req.user});
    })
    .catch(err => next (err));
});

//Show Event's Details

eventsRoutes.get('/events/:id', (req, res, next) => {
  const eventId = req.params.id;

  Event.findById(eventId)
    .populate("creator")
    .then(event =>{
      res.render('events/details', {event:event , user: req.user});
    })
    .catch(err => next(err));
});

// Edit events


eventsRoutes.get('/events/:id/edit', ensureLoggedIn('/auth/login'), (req, res, next) => {
  Event.findById(req.params.id)
  .then(event =>{
    res.render('events/edit', {event:event, user:req.user});
  })
  .catch(err => next(err));
});


eventsRoutes.post('/events/:id/edit/event', [ensureLoggedIn('/auth/login'), upload.single('imgUrl')], (req, res, next) => {
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
    res.render('/events/edit', {
      event:updates,
      error: e.message
    });
  });
});

//Delete Event

eventsRoutes.post('/events/:id/delete', ensureLoggedIn('/auth/login'), (req, res, next) => {
  const id = req.params.id;
  Event.findByIdAndRemove(id)
    .then(event => res.redirect('/events/list'))
    .catch(err => next(err));
});


//Join user to event
eventsRoutes.post('/events/join/:id', ensureLoggedIn('/auth/login'), (req, res, next) => {
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

eventsRoutes.get('/events/join/myevent/:id', ensureLoggedIn('/auth/login'), (req, res, next) =>{
    const joinId = req.params.id;

    RelUserEvent.findById(joinId)
      .populate('eventId')
      .populate('userId')
      .then(join =>{
        res.render('events/join-ok', {join});
      })
      .catch(err => next(err));
});

// Unjoin user to event

eventsRoutes.post('/events/join/myevent/:id/delete', (req, res, next) =>{
    const id = req.params.id;
    console.log("8========D---3");
    console.log(id);
    Event.findByIdAndRemove(id)
    .then(join => res.redirect('/events/list'))
    .catch(err => next(err));
});

eventsRoutes.get('/events/unjoin/myevent/:id', ensureLoggedIn('/auth/login'), (req, res, next) =>{
    const joinId = req.params.id;

    RelUserEvent.findById(joinId)
      .populate('eventId')
      .populate('userId')
      .then(join =>{
        res.render('events/list', {join});
      })
      .catch(err => next(err));
});

module.exports = eventsRoutes;
