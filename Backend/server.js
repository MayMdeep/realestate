require('dotenv').config();
const app = require('./app.js');
const http = require('http');
const cron = require('node-cron');
const { getAnalyticsData } = require('./services/googleAnalytics'); 


const server = http.createServer(app);

const PORT = process.env.PORT || 3005;


// Schedule a job to run every day at midnight
// cron.schedule('0 0 * * *', async () => {
//   try {
//     const viewId = '341903341'; // Replace with your Universal Analytics View ID
//     const data = await getAnalyticsData(viewId);
//     console.log('Google Analytics data:', data);
//   } catch (error) {
//     console.error('Error fetching Google Analytics data:', error);
//   }
// });
cron.schedule('0 0 * * *', async () => {
  try {
    const propertyId = 'properties/473805376'; // Replace with your GA4 property ID
    const data = await getAnalyticsData(propertyId);
  } catch (error) {
    console.error('Error fetching Google Analytics data:', error);
  }
});
server.listen(PORT, () => {
  console.log(`The Server is running on port ${PORT}`);
});