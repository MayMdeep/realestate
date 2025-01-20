const Log = require('../models/log.model.js');

const logActivity = (action) => async (req, res, next) => {
  try {
    const log = new Log({
      user: req.user?._id, // Assuming req.user is populated by authentication middleware
      action: action,
      details: JSON.stringify(req.body || req.query || req.params), // Log request details
      ipAddress: req.ip, // Log the user's IP address
      userAgent: req.get('User-Agent'), // Log the user's browser/device info
    });

    await log.save(); // Save the log to the database
  } catch (error) {
    console.error('Error logging activity:', error);
  }

  next(); // Continue to the next middleware/route handler
};

module.exports = logActivity;