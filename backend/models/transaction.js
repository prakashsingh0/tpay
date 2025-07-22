const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Transaction = sequelize.define('Transaction', {
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'success', 'failed'),
    defaultValue: 'pending',
  },
});

Transaction.belongsTo(User, { as: 'Sender', foreignKey: 'senderId' });
Transaction.belongsTo(User, { as: 'Receiver', foreignKey: 'receiverId' });

module.exports = Transaction;
