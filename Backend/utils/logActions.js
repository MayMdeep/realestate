const Log = require('../models/log');

exports.logAction = async (userId, action, details) => {
  const log = new Log({ user: userId, action, details });
  await log.save();
};