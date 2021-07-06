const express = require('express');
const router = express.Router();

const triviaController = require('../controllers/triviaController');
const isfinished = require('../middlewares/trivia_isfinished');
const parseCookie = require('../middlewares/trivia_parseCookie');
const startgame = require('../middlewares/trivia_startgame');


router.get('/', triviaController.index);
router.get('/finish', parseCookie, triviaController.finish);
router.get('/checkAnswer/:ques/:ans', triviaController.checkAnswer);
router.post('/start', startgame, triviaController.start);
router.post('/next', [parseCookie,isfinished], triviaController.nextQue);


module.exports = router;