const router = require('express').Router();
const multer  = require('multer');
const profileController = require("../controllers/profileController");
const OBJECTIVES   = require('../models/running-objectives');
const User = require("../models/User");
const {ensureLoggedIn} = require ('connect-ensure-login');

const upload = multer ({dest: './public/uploads'});

router.get('/profile', profileController.profileGet);

router.get('/:id/edit', (req, res, next) => {
    res.render('profile/edit');
  });

router.post('/profile/:id/edit', [ensureLoggedIn('/auth/login'), upload.single('imgUrl')], (req, res, next) => {

  const {name,username,email,objectives,aboutMe,city} = req.body;

  const updates = { name,username,email,objectives,aboutMe,city,
      imgUrl: `uploads/${req.file.filename}`,
       };

  User.findByIdAndUpdate(req.params.id, updates)
  .then(user => res.redirect(`/profile`))
  .catch(e => {
    console.log(e);
    console.log("PROFILE UPDATED");
    res.render('profile/edit', {
      user:updates,
      error: e.message,
      objectives: OBJECTIVES
    });
  });
});



module.exports = router;
