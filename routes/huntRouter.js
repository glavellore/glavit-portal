const express = require('express');
const router = express.Router();

const huntController = require('../controllers/huntController');
const isfinished = require('../middlewares/isfinished');
const startgame = require('../middlewares/startgame');


router.get('/', huntController.index);
router.get('/finish', huntController.finish);
router.get('/checkAnswer/:ques/:ans', huntController.checkAnswer);
router.post('/start', startgame, huntController.start);
router.post('/next', isfinished, huntController.nextQue);


module.exports = router;