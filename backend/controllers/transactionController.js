const { Transaction, User, sequelize } = require('../models');

exports.makeTransaction = async (req, res) => {
  const t = await sequelize.transaction(); // Start SQL transaction

  try {
    const senderId = req.user.id;
    const { receiverId, amount } = req.body;

    const sender = await User.findByPk(senderId, { transaction: t });
    const receiver = await User.findByPk(receiverId, { transaction: t });

    if (!receiver) {
      await t.rollback();
      return res.status(404).json({ message: 'Receiver not found' });
    }

    if (sender.balance < amount) {
      await t.rollback();
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Deduct from sender
    await User.decrement('balance', { by: amount, where: { id: senderId }, transaction: t });

    // Add to receiver
    await User.increment('balance', { by: amount, where: { id: receiverId }, transaction: t });

    // Create transaction record
    const transactionRecord = await Transaction.create({
      senderId,
      receiverId,
      amount,
      status: 'success',
    }, { transaction: t });

    await t.commit();

    res.status(201).json({ message: 'Transaction successful', transaction: transactionRecord });

  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: err.message });
  }
};




exports.transactionHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const sent = await Transaction.findAll({ where: { senderId: userId } });
    const received = await Transaction.findAll({ where: { receiverId: userId } });

    res.json({ sent, received });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
