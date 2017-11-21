const router = require('express').Router();
const multer  = require('multer');
const profileController = require("../controllers/profileController");

router.get('/', profileController.profileGet);

module.exports = router;
