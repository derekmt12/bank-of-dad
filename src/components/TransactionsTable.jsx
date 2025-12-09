import { TransactionItem } from "./TransactionItem";

export function TransactionsTable({ transactions }) {
  const sorted = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <section className="overflow-visible rounded-2xl border-2 border-sky-200 bg-white/90 shadow-xl shadow-sky-100">
      <div className="border-b-2 border-sky-200 bg-sky-50 px-4 py-3 sm:px-6 rounded-t-2xl">
        <h2 className="text-xl font-extrabold text-sky-700 drop-shadow-sm">Transactions</h2>
        <p className="text-sm font-semibold text-sky-500">Recent activity with the stuff that matters.</p>
      </div>

      {sorted.length === 0 ? (
        <div className="px-4 py-8 text-center text-sm text-slate-500 sm:px-6">
          No transactions yet.
        </div>
      ) : (
        <div className="divide-y divide-sky-100">
          {sorted.map((tx) => (
            <TransactionItem key={tx.id} tx={tx} />
          ))}
        </div>
      )}
    </section>
  );
}

