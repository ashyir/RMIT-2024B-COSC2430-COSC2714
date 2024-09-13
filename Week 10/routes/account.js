const accountController = require('../controllers/accountController');
const express = require('express');

const router = express.Router();

router.get('/', accountController.index);
router.get('/profile', accountController.profile);
router.get('/logout', accountController.logout);
router.get('/login', accountController.login);
router.post('/login', accountController.authenticate);

module.exports = router;