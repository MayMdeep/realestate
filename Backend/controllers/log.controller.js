const Log = require('../models/log.model.js');
const ApiResponse = require('../utils/ApiResponse.js');

exports.createLog = async (req, res) => {
  try {
    const log = new Log(req.body);
    await log.save();
    new ApiResponse(res).success({ message: 'Log created successfully' }, 201); 
  } catch (error) {
    new ApiResponse(res).error(error.message, 500); 
  }
};

exports.fetchLogs = async (req, res) => {
  try {
    // get filters from query parameters
    const filters = req.query.filters || {};

    // Construct the MongoDB query object
    const query = {};
    for (const key in filters) {
      if (filters.hasOwnProperty(key)) {
        // Handle special cases (e.g., date range for createdAt)
        if (key === 'createdAt') {
          const [startDate, endDate] = filters[key].split(',');
          query[key] = { $gte: new Date(startDate), $lte: new Date(endDate) };
        } else if (key === 'email') {
          query['user.email'] = { $regex: filters[key], $options: 'i' }; 
        } else {
          query[key] = filters[key];
        }
      }
    }

    // pagination parameters
    const page = parseInt(req.query.page) || 1; 
    const perPage = parseInt(req.query.perPage) || 10; 
    const skip = (page - 1) * perPage; 

    const logs = await Log.find(query)
      .populate('user', 'email') 
      .skip(skip)
      .limit(perPage);

    const total = await Log.countDocuments(query);

    const totalPages = Math.ceil(total / perPage);

    // Send paginated response
    new ApiResponse(res).paginate(logs, {
      page,
      perPage,
      total,
      totalPages,
    });
  } catch (error) {
    new ApiResponse(res).error(error.message, 500);
  }
};