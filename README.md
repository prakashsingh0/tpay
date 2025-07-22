# 💸 Tpay — Micro Loan & Payment Platform

Tpay is a secure and scalable digital wallet and micro-finance platform designed for students and gig workers. It offers services such as peer-to-peer payments, mobile recharge, utility bill payments, gas bookings, and short-term micro-loans — all backed by secure authentication and wallet management.

---

## 📦 Features

- 🔐 Secure user authentication (JWT)
- 👛 Digital wallet management
- 💸 P2P money transfer
- 🧾 Transaction history
- 📱 Mobile recharge
- 💡 Electricity bill payment
- 🔥 Gas cylinder booking
- 📈 Loan application and repayment
- 🔔 SMS/Email notifications
- 📊 Admin and user dashboards

---

## ⚙️ Tech Stack

| Component       | Technology           |
|----------------|----------------------|
| Frontend       | React / React Native |
| Backend        | Node.js + Express    |
| Database       | MySQL                |
| Authentication | JWT + Bcrypt         |
| Notifications  | Twilio / Firebase    |
| Payments API   | [To be integrated: BBPS, Rechapi, Pay1, etc.] |
| Hosting        | Render / Vercel      |

---

## 🗃️ Database Schema (Entities)

### 👤 User
- `user_id`, `name`, `email`, `phone`, `password_hash`, `user_type`, `created_at`

### 👛 Wallet
- `wallet_id`, `user_id`, `balance`, `updated_at`

### 💸 Transaction
- `transaction_id`, `sender_wallet_id`, `receiver_wallet_id`, `amount`, `type`, `status`, `created_at`

### 📈 Loan
- `loan_id`, `user_id`, `amount`, `interest_rate`, `status`, `issued_at`, `due_date`

### 💰 Repayment
- `repayment_id`, `loan_id`, `amount`, `paid_at`

### 📱 Recharge
- `recharge_id`, `user_id`, `mobile_number`, `operator`, `amount`, `status`, `created_at`

### ⚡ Bill Payment
- `bill_id`, `user_id`, `bill_type`, `consumer_number`, `operator_name`, `amount`, `status`, `created_at`

### 🛡️ KYC
- `kyc_id`, `user_id`, `document_type`, `document_number`, `status`, `uploaded_at`

---

## 🚀 Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/tpay.git
cd tpay-backend

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env
# Edit .env with your MySQL, JWT, and API credentials

# 4. Run the server
npm start




PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=tpay
JWT_SECRET=your_jwt_secret

TWILIO_SID=your_twilio_sid
TWILIO_AUTH=your_twilio_auth
