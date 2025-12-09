import { useSelector } from "react-redux";
import BalanceChart from "./components/BalanceChart";
import Header from "./components/Header";
import TransactionsTable from "./components/TransactionsTable";

function App() {
  const { balance, transactions } = useSelector((state) => state.transactions);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Header balance={balance} />

        <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <TransactionsTable transactions={transactions} />
          <BalanceChart transactions={transactions} />
        </div>
      </div>
    </main>
  );
}

export default App;
