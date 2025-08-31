const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ✅ Generate unique TPAY account number
const generateAccountNumber = () => {
  return 'TPAY' + Math.floor(100000 + Math.random() * 900000);
};

exports.register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      accountNumber: generateAccountNumber(),
      balance: 0.0 // Default balance
    });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ message: 'Login successful', token,user });
    // console.log("User logged in:", user.name);
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.userProfile = async (req, res) => {
  const userId = req.user.id;
  try {
    // find user without password
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });
    //check user Exists or not if not then send 404 or this message
    if (!user) return res.status(404).json({ message: "User not found" });
    // if user found then send user data
    res.status(200).json({
      message: "User Profile fetch Successfully",
      user
    });
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
