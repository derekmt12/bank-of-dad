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
  {
    id: 6,
    type: "deposit",
    amount: 25,
    memo: "Lawn mowing",
    date: "2024-06-10T13:00:00.000Z",
    balance: 146.5,
  },
  {
    id: 7,
    type: "withdraw",
    amount: 12,
    memo: "Ice cream outing",
    date: "2024-06-12T18:20:00.000Z",
    balance: 134.5,
  },
  {
    id: 8,
    type: "deposit",
    amount: 40,
    memo: "Gift from grandma",
    date: "2024-06-15T11:00:00.000Z",
    balance: 174.5,
  },
  {
    id: 9,
    type: "interest",
    amount: 8.73,
    memo: "Weekly interest",
    date: "2024-06-17T09:00:00.000Z",
    balance: 183.23,
  },
  {
    id: 10,
    type: "withdraw",
    amount: 30,
    memo: "Movie night",
    date: "2024-06-19T19:00:00.000Z",
    balance: 153.23,
  },
  {
    id: 11,
    type: "deposit",
    amount: 60,
    memo: "Yard sale earnings",
    date: "2024-06-22T15:00:00.000Z",
    balance: 213.23,
  },
  {
    id: 12,
    type: "withdraw",
    amount: 45,
    memo: "Sports gear",
    date: "2024-06-24T17:00:00.000Z",
    balance: 168.23,
  },
  {
    id: 13,
    type: "deposit",
    amount: 35,
    memo: "Babysitting",
    date: "2024-06-26T20:00:00.000Z",
    balance: 203.23,
  },
  {
    id: 14,
    type: "interest",
    amount: 10.16,
    memo: "Weekly interest",
    date: "2024-06-27T08:00:00.000Z",
    balance: 213.39,
  },
  {
    id: 15,
    type: "withdraw",
    amount: 18,
    memo: "Coffee runs",
    date: "2024-06-29T08:30:00.000Z",
    balance: 195.39,
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
      if (Number.isNaN(amount) || amount <= 0) return;
      const memo = action.payload.memo || "";
      const date = action.payload.date || new Date().toISOString();
      state.balance += amount;
      state.transactions.push({
        id: Date.now(),
        type: "deposit",
        amount,
        memo,
        date,
        balance: state.balance,
      });
    },
    withdraw: (state, action) => {
      const amount = parseFloat(action.payload.amount || action.payload);
      if (Number.isNaN(amount) || amount <= 0 || amount > state.balance) return;
      const memo = action.payload.memo || "";
      const date = action.payload.date || new Date().toISOString();
      state.balance -= amount;
      state.transactions.push({
        id: Date.now(),
        type: "withdraw",
        amount,
        memo,
        date,
        balance: state.balance,
      });
    },
    addInterest: (state, action) => {
      const rate = action?.payload?.rate ?? state.interestRate;
      const interest = state.balance * rate;
      const date = action?.payload?.date || new Date().toISOString();
      state.balance += interest;
      state.transactions.push({
        id: Date.now(),
        type: "interest",
        amount: interest,
        memo: action?.payload?.memo || "Interest applied",
        date,
        balance: state.balance,
      });
    },
  },
});

export const { deposit, withdraw, addInterest } = transactionSlice.actions;
export const transactionReducer = transactionSlice.reducer;
