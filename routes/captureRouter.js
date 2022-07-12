const express = require('express');
const router = express.Router();

const captureController = require('../controllers/captureController');
const isfinished = require('../middlewares/isfinished');
const parseCookie = require('../middlewares/parseCookie');
const startgame = require('../middlewares/startgame');


router.get('/', captureController.index);
router.get('/finish', parseCookie, captureController.finish);
router.get('/checkAnswer/:ques/:ans', captureController.checkAnswer);
router.post('/start', startgame, captureController.start);
router.post('/next', [parseCookie,isfinished], captureController.nextQue);


module.exports = router;