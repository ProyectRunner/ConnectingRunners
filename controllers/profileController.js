const User  = require("../models/User");

module.exports = {

  profileGet: (req, res, next) => {
    res.render('profile/profile');
  }

};
