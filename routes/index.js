const router = require('express').Router();
const IndexController = require('../controllers/IndexController');
const auth = require("./auth");
const multer  = require('multer');

router.get('/', IndexController.index);
router.use('/auth', auth);

module.exports = router;
