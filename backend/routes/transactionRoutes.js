const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { makeTransaction, transactionHistory } = require('../controllers/transactionController');

router.post('/', auth, makeTransaction);
router.get('/history', auth, transactionHistory);

module.exports = router;
