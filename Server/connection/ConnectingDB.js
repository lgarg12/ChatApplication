const mongoose = require('mongoose');

module.exports = async function connectToDB() {
  try {
    const mongoDBURL = 'mongodb://127.0.0.1:27017/chatApp';

    await mongoose.connect(mongoDBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};
