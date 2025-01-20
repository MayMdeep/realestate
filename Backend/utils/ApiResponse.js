class ApiResponse {
  constructor(res) {
    this.res = res;
  }

  // Success response with data
  success(data, status = 200) {
    this.res.status(status).json({
      success: true,
      data,
    });
  }

  // Paginated response
  paginate(data, pagination, status = 200) {
    this.res.status(status).json({
      success: true,
      data,
      pagination,
    });
  }

  // Generic error response
  error(message, status = 500) {
    this.res.status(status).json({
      success: false,
      error: message,
    });
  }

  // Unauthorized (401) response
  unauthorized(message = 'You Are Not Authorized') {
    this.res.status(401).json({
      success: false,
      error: message,
    });
  }

  // Forbidden (403) response
  forbidden(message = 'Forbidden') {
    this.res.status(403).json({
      success: false,
      error: message,
    });
  }

  // Not Found (404) response
  notFound(message = 'Resource not found') {
    this.res.status(404).json({
      success: false,
      error: message,
    });
  }

  // Bad Request (400) response
  badRequest(message = 'Bad Request') {
    this.res.status(400).json({
      success: false,
      error: message,
    });
  }
}

module.exports = ApiResponse;