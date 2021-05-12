const express = require('express');
const router = express.Router();

const huntController = require('../controllers/huntController');
const isfinished = require('../middlewares/isfinished');
const parseCookie = require('../middlewares/parseCookie');
const startgame = require('../middlewares/startgame');


router.get('/', huntController.index);
router.get('/finish', parseCookie, huntController.finish);
router.get('/checkAnswer/:ques/:ans', huntController.checkAnswer);
router.post('/start', startgame, huntController.start);
router.post('/next', [parseCookie,isfinished], huntController.nextQue);


module.exports = router;