const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')
const bcrypt = require("bcrypt")
const dotenv = require("dotenv").load()

module.exports = function() {
  passport.serializeUser((user, cb) => {
    cb(null, user.id)
  })

  passport.deserializeUser((id, cb) => {

    User.findById(id, (err, user) => {
      if (err) {
        return cb(err);
      }
      cb(null, user);
    });
  })

  passport.use('local-signup', new LocalStrategy({
      passReqToCallback: true
    },
    (req, username, password, next) => {
      process.nextTick(() => {
        User.findOne({
          'username': username
        }, (err, user) => {
          if (err) {
            return next(err);
          }

          if (user) {
            return next(null, false)
          } else {
            const {
              username,
              email,
              password
            } = req.body;
            const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
            const newUser = new User({
              username,
              email,
              password: hashPass
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

  passport.use('local-login', new LocalStrategy((username, password, next) => {
    console.log('Holaaaa');
    User.findOne({
      username
    }, (err, user) => {
      if (err) {
        return next(err, {
          message: "RINGG: Donde vas error?"
        })
      }
      if (!user) {
        return next(null, false, {
          message: "RINGG: Usuario Incorrecto"
        })
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false, {
          message: "RINGG: Esa contraseña no es correcta"
        })
      }
      return next(null, user);
    });
  }));
}
