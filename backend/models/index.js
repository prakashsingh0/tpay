const sequelize = require('../config/database');
const User = require('./User');
const Transaction = require('./Transaction');

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('✅ MySQL connected & tables synced');
  } catch (error) {
    console.error('❌ Database connection error:', error);
  }
};

module.exports = { sequelize, User, Transaction, connectDB };
