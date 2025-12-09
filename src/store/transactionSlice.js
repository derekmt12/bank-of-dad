import { createSlice } from "@reduxjs/toolkit";

const seededTransactions = [
  {
    id: 1,
    type: "deposit",
    amount: 100,
    memo: "Weekly allowance",
    date: "2024-06-01T10:00:00.000Z",
    balance: 100,
  },
  {
    id: 2,
    type: "withdraw",
    amount: 20,
    memo: "Snacks with friends",
    date: "2024-06-03T14:30:00.000Z",
    balance: 80,
  },
  {
    id: 3,
    type: "deposit",
    amount: 50,
    memo: "Chores payout",
    date: "2024-06-05T09:15:00.000Z",
    balance: 130,
  },
  {
    id: 4,
    type: "interest",
    amount: 6.5,
    memo: "Weekly interest",
    date: "2024-06-07T12:00:00.000Z",
    balance: 136.5,
  },
  {
    id: 5,
    type: "withdraw",
    amount: 15,
    memo: "New game toy",
    date: "2024-06-08T16:45:00.000Z",
    balance: 121.5,
  },
];

const initialState = {
  balance: seededTransactions.at(-1).balance,
  transactions: seededTransactions,
  interestRate: 0.05, // 5% interest rate
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    deposit: (state, action) => {
      const amount = parseFloat(action.payload.amount || action.payload);
      const memo = action.payload.memo || "";
      state.balance += amount;
      state.transactions.push({
        id: Date.now(),
        type: "deposit",
        amount: amount,
        memo: memo,
        date: new Date().toISOString(),
        balance: state.balance,
      });
    },
    withdraw: (state, action) => {
      const amount = parseFloat(action.payload.amount || action.payload);
      const memo = action.payload.memo || "";
      if (amount <= state.balance) {
        state.balance -= amount;
        state.transactions.push({
          id: Date.now(),
          type: "withdraw",
          amount: amount,
          memo: memo,
          date: new Date().toISOString(),
          balance: state.balance,
        });
      }
    },
    addInterest: (state) => {
      const interest = state.balance * state.interestRate;
      state.balance += interest;
      state.transactions.push({
        id: Date.now(),
        type: "interest",
        amount: interest,
        memo: "Weekly interest",
        date: new Date().toISOString(),
        balance: state.balance,
      });
    },
  },
});

export const { deposit, withdraw, addInterest } = transactionSlice.actions;
export default transactionSlice.reducer;
