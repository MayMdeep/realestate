const { google } = require('googleapis');
const serviceAccount = require('../curious-helix-448317-u6-f4e7fd73981a.json');
const analytics = google.analyticsdata('v1beta');

/**
 * Fetches Google Analytics page views data for a given GA4 property ID.
 * @param {string} propertyId - The GA4 property ID (e.g., 'properties/123456789').
 * @returns {Promise<Object>} - The analytics data.
 */
const getPageViewsData = async (propertyId) => {
  const authClient = new google.auth.JWT({
    email: serviceAccount.client_email,
    key: serviceAccount.private_key,
    scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
  });

  await authClient.authorize();

  try {
    const response = await analytics.properties.runReport({
      auth: authClient,
      property: propertyId,
      requestBody: {
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        metrics: [{ name: 'screenPageViews' }], // Metric for page views
        dimensions: [{ name: 'pagePath' }], // Dimension for page path
      },
    });

    console.log('API Response:', JSON.stringify(response.data, null, 2)); // Log the full response
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Export the function
module.exports = { getPageViewsData };