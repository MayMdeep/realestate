const express = require('express');
const {
  getUsers,
  createUser,
  approveUser,
  banUser,
  getMe
} = require('../controllers/user.controller.js');
const verifyToken = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');
const logActivity = require('../middleware/logActivity.js');

const router = express.Router();

router.get('/me', verifyToken, getMe); 
router.post('/', createUser);

// Protected routes: Require authentication (added middelwares)
router.get('/', verifyToken,logActivity('get_users'), getUsers); 

router.patch('/approve/:id', verifyToken, isAdmin, approveUser); 
router.patch('/ban/:id', verifyToken, isAdmin, banUser); 

module.exports = router;