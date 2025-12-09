import { TransactionItem } from "./TransactionItem";

export function TransactionsTable({ transactions }) {
  const sorted = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <section className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
      <div className="border-b border-slate-200 px-4 py-3 sm:px-6">
        <h2 className="text-lg font-semibold text-slate-900">Transactions</h2>
        <p className="text-sm text-slate-500">Recent activity with the stuff that matters.</p>
      </div>

      {sorted.length === 0 ? (
        <div className="px-4 py-8 text-center text-sm text-slate-500 sm:px-6">
          No transactions yet.
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {sorted.map((tx) => (
            <TransactionItem key={tx.id} tx={tx} />
          ))}
        </div>
      )}
    </section>
  );
}

