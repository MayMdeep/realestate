const Log = require('../models/log.model.js');
const mongoose = require('mongoose');

// Helper function to get the date range based on the period
function getDateRange(req, period) {
  const defaultDays = period === 'weekly' ? 30 : 7;
  const startDate = req.query.startDate
    ? new Date(req.query.startDate)
    : new Date(new Date().setDate(new Date().getDate() - defaultDays));
  const endDate = req.query.endDate ? new Date(req.query.endDate) : new Date();
  return { startDate, endDate };
}

// Generic function to perform aggregation
async function aggregateData(model, pipeline) {
  return await model.aggregate(pipeline);
}

// get daily active users
exports.getDailyActiveUsers = async (req, res) => {
  try {
    const { startDate, endDate } = getDateRange(req, 'daily');
    const pipeline = [
      { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            hour: { $hour: '$createdAt' },
          },
          activeUsers: { $addToSet: '$user' },
        },
      },
      {
        $project: {
          date: '$_id.date',
          hour: '$_id.hour',
          activeUsers: { $size: '$activeUsers' },
        },
      },
      { $sort: { date: 1, hour: 1 } },
    ];
    const data = await aggregateData(Log, pipeline);
    res.json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get weekly active users
exports.getWeeklyActiveUsers = async (req, res) => {
  try {
    const { startDate, endDate } = getDateRange(req, 'weekly');
    const pipeline = [
      { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          },
          activeUsers: { $addToSet: '$user' },
        },
      },
      {
        $project: {
          date: '$_id.date',
          activeUsers: { $size: '$activeUsers' },
        },
      },
      { $sort: { date: 1 } },
    ];
    const data = await aggregateData(Log, pipeline);
    res.json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get daily page views
exports.getDailyPageViews = async (req, res) => {
  try {
    const { startDate, endDate } = getDateRange(req, 'daily');
    const pipeline = [
      {
        $match: {
          action: 'page_view',
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            hour: { $hour: '$createdAt' },
          },
          pageViews: { $sum: 1 },
        },
      },
      {
        $project: {
          date: '$_id.date',
          hour: '$_id.hour',
          pageViews: 1,
        },
      },
      { $sort: { date: 1, hour: 1 } },
    ];
    const data = await aggregateData(Log, pipeline);
    res.json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get weekly page views
exports.getWeeklyPageViews = async (req, res) => {
  try {
    const { startDate, endDate } = getDateRange(req, 'weekly');
    const pipeline = [
      {
        $match: {
          action: 'page_view',
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          },
          pageViews: { $sum: 1 },
        },
      },
      {
        $project: {
          date: '$_id.date',
          pageViews: 1,
        },
      },
      { $sort: { date: 1 } },
    ];
    const data = await aggregateData(Log, pipeline);
    res.json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};