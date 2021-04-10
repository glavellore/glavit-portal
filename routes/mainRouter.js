const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

router.get('/', mainController.index);
router.get('/tippani', mainController.tippani);
router.get('/response', mainController.response);

module.exports = router;