const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require("bcrypt");
const dotenv = require("dotenv").load();
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });
const OBJECTIVES = require('../models/running-objectives');



module.exports = function() {
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
      if (err) {
        return cb(err);
      }
      cb(null, user);
    });
  });

  passport.use('local-login', new LocalStrategy((username, password, next) => {
    User.findOne({
      username
    }, (err, user) => {
      if (err) {
        return next(err, {
        });
      }
      if (!user) {
        return next(null, false, {
        });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false, {
        });
      }
      return next(null, user);
    });
  }));

  passport.use('local-signup', new LocalStrategy({
      passReqToCallback: true
    },
    (req, username, password, next) => {
      console.log(req.body);
      console.log(req.file);
      let imgUrl = '';
      if (req.file) {
        imgUrl = req.file.filename;
      } else {
        imgUrl = 'https://jsns.eu/components/com_jsn/assets/img/default.jpg';
      }
      process.nextTick(() => {
        User.findOne({
          'username': username
        }, (err, user) => {
          if (err) {
            return next(err);
          }

          if (user) {
            return next(null, false);
          } else {
            const {
              name,
              username,
              password,
              email,
              objective,
              aboutMe,
              city,
            } = req.body;


            const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
            const newUser = new User({
              name,
              username,
              email,
              password: hashPass,
              objective,
              aboutMe,
              city,
              imgUrl,
            });

            newUser.save((err) => {
              if (err) {
                next(err);
              }
              return next(null, newUser);
            });
          }
        });
      });
    }));

};
