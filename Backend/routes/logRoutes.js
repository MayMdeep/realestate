const express = require('express');
const { fetchLogs, createLog } = require('../controllers/log.controller.js');
const verifyToken = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');

const router = express.Router();

router.get('/', verifyToken, isAdmin, fetchLogs);
router.post('/', verifyToken, createLog);

module.exports = router;