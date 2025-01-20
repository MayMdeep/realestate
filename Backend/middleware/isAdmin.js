const ApiResponse = require('../utils/ApiResponse'); 

function isAdmin(req, res, next) {
  const apiResponse = new ApiResponse(res); // Create an instance of ApiResponse

  if (req.user?.role === 'admin') {
    next(); // Allow the request to proceed
  } else {
    // Use ApiResponse for forbidden (403) error
    apiResponse.forbidden('You do not have permission to perform this action');
  }
}

module.exports = isAdmin;