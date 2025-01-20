const express = require('express');
const { register, login } = require('../controllers/user.controller.js');
const logActivity = require('../middleware/logActivity.js');

const router = express.Router();

router.post('/register',logActivity('register'), register);
router.post('/login' ,logActivity('login'), login);

module.exports = router;