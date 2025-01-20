const express = require('express');
const router = express.Router();
const metricsController = require('../controllers/metrics.controller.js');
// const { getAnalyticsData } = require('../services/googleAnalytics');
const { getPageViewsData } = require('../services/googleAnalytics');

const verifyToken = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');
// Daily Active Users
router.get('/daily-active-users', verifyToken, isAdmin, metricsController.getDailyActiveUsers);

// Weekly Active Users
router.get('/weekly-active-users', verifyToken, isAdmin, metricsController.getWeeklyActiveUsers);

// Daily Page Views
router.get('/daily-page-views', verifyToken, isAdmin, metricsController.getDailyPageViews);

// Weekly Page Views
router.get('/weekly-page-views', verifyToken, isAdmin, metricsController.getWeeklyPageViews);
router.get('/analytics', async (req, res) => {
  try {
    const propertyId = 'properties/473805376'; // Replace with your GA4 property ID
    const data = await getPageViewsData(propertyId);
    res.json(data);
  } catch (error) {
    console.error('Error fetching Google Analytics data:', error);
    res.status(500).json({ error: 'Failed to fetch Google Analytics data' });
  }
});

module.exports = router;