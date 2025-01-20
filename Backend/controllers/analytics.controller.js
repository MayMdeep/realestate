const { getAnalyticsData } = require('../services/googleAnalytics.js');

const fetchAnalyticsData = async (req, res) => {
  try {
    const propertyId = '473805376'; 
    const data = await getAnalyticsData(propertyId);
    res.json(data);
  } catch (error) {
    console.error('Error fetching Google Analytics data:', error);
    res.status(500).json({ error: 'Failed to fetch Google Analytics data' });
  }
};

module.exports = { fetchAnalyticsData };