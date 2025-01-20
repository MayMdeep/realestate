const User = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiResponse = require('../utils/ApiResponse.js'); // Import the ApiResponse class

exports.getUsers = async (req, res) => {
  try {
    // Extract filters from query parameters if exist
    const filters = req.query.filters || {};

    const query = {};
    for (const key in filters) {
      if (filters.hasOwnProperty(key)) {
        if (key === 'email') {
          query[key] = { $regex: filters[key], $options: 'i' }; 
        } else {
          query[key] = filters[key];
        }
      }
    }

    //pagination parameters
    const page = parseInt(req.query.page) || 1; 
    const perPage = parseInt(req.query.perPage) || 10;
    const skip = (page - 1) * perPage; 

    // get paginated users from the database
    const users = await User.find(query).skip(skip).limit(perPage);

    // get the total number of filtered users
    const total = await User.countDocuments(query);

    // Calculate total pages
    const totalPages = Math.ceil(total / perPage);

    // Send paginated response
    new ApiResponse(res).paginate(users, {
      page,
      perPage,
      total,
      totalPages,
    });
  } catch (error) {
    new ApiResponse(res).error(error.message, 500);
  }
};

exports.createUser = async (req, res) => {
  try {
    const { email, password, role, status } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    // Set default status to 'pending' if no status is provided
    const userStatus = status || 'pending';

    const user = new User({
      email,
      password: hashedPassword,
      role,
      status: userStatus, 
    });

    await user.save();

    new ApiResponse(res).success({ message: 'User created successfully', user }, 201); 
  } catch (error) {
    new ApiResponse(res).error(error.message, 400); 
  }
};

exports.register = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    new ApiResponse(res).success({ message: 'User registered successfully' }, 201); // Use ApiResponse for success
  } catch (error) {
    new ApiResponse(res).error(error.message, 400); // Use ApiResponse for error
  }
};


exports.getMe = async (req, res) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1]; // Format: "Bearer <token>"
    if (!token) {
      return new ApiResponse(res).error('Access denied. No token provided.', 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return new ApiResponse(res).error('User not found.', 404);
    }
    new ApiResponse(res).success({user });
  } catch (error) {
    new ApiResponse(res).error(error.message, 500);
  }
};
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return new ApiResponse(res).error('Invalid credentials', 401); // Use ApiResponse for error
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return new ApiResponse(res).error('Invalid credentials', 401); // Use ApiResponse for error
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    new ApiResponse(res).success({ token }); 
  } catch (error) {
    new ApiResponse(res).error(error.message, 500); 
  }
};

// Approve a user
exports.approveUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { status: 'approved' });
    new ApiResponse(res).success({ message: 'User approved' }); 
  } catch (error) {
    new ApiResponse(res).error(error.message, 500); 
  }
};

// Ban a user
exports.banUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { status: 'banned' });
    new ApiResponse(res).success({ message: 'User banned' }); 
  } catch (error) {
    new ApiResponse(res).error(error.message, 500);
  }
};