import { createSlice } from "@reduxjs/toolkit";

type Transaction = {
  id: string;
  type: "credit" | "debit";
  amount: string;
  date: string;
  time: string;
  status: string;
};

interface WalletState {
  balance: number;
  transactions: Transaction[];
}

const initialState: WalletState = {
  balance: 0,
  transactions: [],
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
    setTransactions: (state, action) => {
      state.transactions = action.payload.history ?? [];
      state.balance = action.payload.balance ?? state.balance;
    },
    addTransaction: (state, action) => {
      state.transactions.unshift(action.payload);
    },
    clearWallet: () => initialState, // ✅ reset state
  },
});

export const {
  setBalance,
  setTransactions,
  addTransaction,
  clearWallet,
} = walletSlice.actions;
export default walletSlice.reducer;
