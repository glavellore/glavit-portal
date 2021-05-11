const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

router.get('/', mainController.index);
router.get('/home', mainController.home);
router.get('/tippani', mainController.tippani);
router.get('/response', mainController.response);
router.get('/refresh', mainController.refresh);
// router.get('/admin', )

module.exports = router;