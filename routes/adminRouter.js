const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const parseAdmin = require('../middlewares/parseAdmin');

router.get('/', adminController.index);
router.get('/home', parseAdmin, adminController.home);
router.get('/huntResult', parseAdmin, adminController.huntResult);
router.get('/triviaResult', parseAdmin, adminController.triviaResult);
router.post('/login', adminController.login);

// router.get('/admin', )

module.exports = router;