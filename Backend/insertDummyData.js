require('dotenv').config(); // Load environment variables

const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const Log = require('./models/log.model.js'); // Adjust the path to your Log model

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Generate dummy logs
const generateDummyLogs = (numLogs) => {
  const logs = [];
  for (let i = 0; i < numLogs; i++) {
    const log = {
      user: faker.database.mongodbObjectId(), // Random user ID
      action: faker.helpers.arrayElement(['login', 'page_view']), // Random action
      details: faker.lorem.sentence(), // Random details
      ipAddress: faker.internet.ip(), // Random IP address
      userAgent: faker.internet.userAgent(), // Random user agent
      createdAt: faker.date.between({ // Random date within the last 7 days
        from: new Date(new Date().setDate(new Date().getDate() - 7)),
        to: new Date(),
      }),
    };
    logs.push(log);
  }
  return logs;
};

// Insert dummy data into MongoDB
const insertDummyData = async () => {
  try {
    const dummyLogs = generateDummyLogs(100); // Generate 100 dummy logs
    await Log.insertMany(dummyLogs);
    console.log('Dummy data inserted successfully');
  } catch (error) {
    console.error('Error inserting dummy data:', error);
  } finally {
    mongoose.connection.close();
  }
};

insertDummyData();