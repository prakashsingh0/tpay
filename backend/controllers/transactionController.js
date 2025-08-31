const { Transaction, User, sequelize } = require('../models');
const { Op } = require("sequelize");

//  Make Transaction
exports.makeTransaction = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const senderId = req.user.id;
    const { receiverIdentifier, amount } = req.body;

    if (!receiverIdentifier || !amount) {
      await t.rollback();
      return res.status(400).json({ message: "Receiver and amount are required" });
    }

    // Find receiver
    const receiver = await User.findOne({
      where: {
        [Op.or]: [
          { id: receiverIdentifier },
          { phone: receiverIdentifier },
          { accountNumber: receiverIdentifier },
          { email: receiverIdentifier },
        ],
      },
      transaction: t,
    });

    if (!receiver) {
      await t.rollback();
      return res.status(404).json({ message: "Receiver not found" });
    }

    if (receiver.id === senderId) {
      await t.rollback();
      return res.status(400).json({ message: "This transaction is not allowed" });
    }

    // Find sender
    const sender = await User.findByPk(senderId, { transaction: t });

    if (sender.balance < amount) {
      await t.rollback();
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Deduct from sender
    await User.decrement("balance", {
      by: amount,
      where: { id: senderId },
      transaction: t,
    });

    // Add to receiver
    await User.increment("balance", {
      by: amount,
      where: { id: receiver.id },
      transaction: t,
    });

    // ✅ Save ONE transaction entry
    const transaction = await Transaction.create(
      {
        senderId,
        receiverId: receiver.id,
        amount,
        status: "success",
        type: "transfer",  // generic type
      },
      { transaction: t }
    );

    await t.commit();

    res.status(201).json({
      message: "Transaction successful",
      transaction: {
        id: transaction.id,
        amount: amount,
        status: "success",
        date: transaction.createdAt.toISOString().slice(0, 10),
        time: transaction.createdAt.toLocaleTimeString("en-IN", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        }),
      },
    });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: err.message });
  }
};





//  Transaction History
exports.transactionHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch transactions with sender & receiver info
    const transactions = await Transaction.findAll({
      where: {
        [Op.or]: [{ senderId: userId }, { receiverId: userId }],
      },
      include: [
        { model: User, as: "Sender", attributes: ["id", "name", "email", "phone"] },
        { model: User, as: "Receiver", attributes: ["id", "name", "email", "phone"] },
      ],
      order: [["createdAt", "DESC"]],
    });

    // Get balance
    const user = await User.findByPk(userId, {
      attributes: ["balance"],
    });

    // ✅ Format transactions
    const formatted = transactions.map((tx) => {
      const isSender = tx.senderId === userId;

      return {
        id: tx.id,
        type: isSender ? "debit" : "credit", 
        amount: `${isSender ? "-" : "+"}₹${Number(tx.amount).toFixed(2)}`,
        date: tx.createdAt.toISOString().slice(0, 10),
        time: tx.createdAt.toLocaleTimeString("en-IN", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        }),
        status: tx.status,

        // 👇 Only show the "other party"
        otherParty: isSender
          ? {   // sender → show receiver
              id: tx.Receiver?.id,
              name: tx.Receiver?.name,
              email: tx.Receiver?.email,
              phone: tx.Receiver?.phone,
            }
          : {   // receiver → show sender
              id: tx.Sender?.id,
              name: tx.Sender?.name,
              email: tx.Sender?.email,
              phone: tx.Sender?.phone,
            },
      };
    });

    res.json({
      balance: user.balance,
      history: formatted,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

