const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the user
  action: { type: String, required: true }, // action types from document (login, logout, page_views)
  details: { type: String }, 
  ipAddress: { type: String }, 
  userAgent: { type: String }, 
}, { timestamps: true }); 
const Log = mongoose.model('Log', LogSchema);
module.exports = Log;