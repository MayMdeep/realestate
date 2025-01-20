const jwt = require('jsonwebtoken');
const ApiResponse = require('../utils/ApiResponse'); 

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  const apiResponse = new ApiResponse(res); // Create an instance of ApiResponse

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
      if (err) {
        // Use ApiResponse for forbidden (403) error
        return apiResponse.forbidden('Invalid or expired token');
      } else {
        req.user = authData; // Attach user data to the request object
        next();
      }
    });
  } else {
    // Use ApiResponse for unauthorized (401) error
    apiResponse.unauthorized('Authorization header is missing');
  }
}

module.exports = verifyToken;