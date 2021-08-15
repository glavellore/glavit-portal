const express = require('express');
const router = express.Router();

const fliqController = require('../controllers/fliqController');
const isfinished = require('../middlewares/fliq_isfinished');
const parseCookie = require('../middlewares/fliq_parseCookie');
const startgame = require('../middlewares/fliq_startgame');


router.get('/', fliqController.index);
router.get('/finish', parseCookie, fliqController.finish);
router.get('/checkAnswer/:ques/:ans', fliqController.checkAnswer);
router.post('/start', startgame, fliqController.start);
router.post('/next', [parseCookie,isfinished], fliqController.nextQue);


module.exports = router;