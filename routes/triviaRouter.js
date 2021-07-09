const express = require('express');
const router = express.Router();

const triviaController = require('../controllers/triviaController');
const startgame = require('../middlewares/trivia_startgame');


router.get('/', triviaController.index);
router.post('/start', startgame, triviaController.start);
router.post('/submit', startgame, triviaController.submit);

module.exports = router;