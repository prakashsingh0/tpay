const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accountNumber: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  balance: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  upi: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true
  }
});

// 🔹 Hook: Auto-generate UPI before creating user
User.beforeCreate((user, options) => {
  if (user.phone) {
    user.upi = `${user.phone}@tpay`;
  }
});

// 🔹 Hook: Auto-update UPI if phone changes
User.beforeUpdate((user, options) => {
  if (user.phone) {
    user.upi = `${user.phone}@tpay`;
  }
});

module.exports = User;
