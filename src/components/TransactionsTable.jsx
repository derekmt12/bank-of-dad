import { formatCurrency, formatDate } from "../utils/formatters";

const typeLabels = {
  deposit: "Deposit",
  withdraw: "Withdrawal",
  interest: "Interest",
};

const typePillClasses = {
  deposit: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  withdraw: "bg-amber-50 text-amber-800 ring-amber-200",
  interest: "bg-indigo-50 text-indigo-700 ring-indigo-200",
};

function TransactionsTable({ transactions }) {
  return (
    <section className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
      <div className="border-b border-slate-200 px-4 py-3 sm:px-6">
        <h2 className="text-lg font-semibold text-slate-900">Transactions</h2>
        <p className="text-sm text-slate-500">Date, type, memo, and amount for each entry.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="whitespace-nowrap px-4 py-3 font-semibold text-slate-700 sm:px-6">Date</th>
              <th className="whitespace-nowrap px-4 py-3 font-semibold text-slate-700 sm:px-6">Type</th>
              <th className="px-4 py-3 font-semibold text-slate-700 sm:px-6">Memo</th>
              <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-slate-700 sm:px-6">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {transactions.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-center text-slate-500 sm:px-6" colSpan={4}>
                  No transactions yet.
                </td>
              </tr>
            ) : (
              transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50">
                  <td className="whitespace-nowrap px-4 py-3 text-slate-800 sm:px-6">{formatDate(tx.date)}</td>
                  <td className="whitespace-nowrap px-4 py-3 sm:px-6">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
                        typePillClasses[tx.type] || "bg-slate-100 text-slate-700 ring-slate-200"
                      }`}
                    >
                      {typeLabels[tx.type] || tx.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700 sm:px-6">{tx.memo || "—"}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-right font-semibold sm:px-6">
                    <span
                      className={`inline-flex items-center justify-end tabular-nums ${
                        tx.type === "withdraw" ? "text-rose-700" : "text-emerald-700"
                      }`}
                    >
                      {tx.type === "withdraw" ? "-" : "+"}
                      {formatCurrency(Math.abs(tx.amount))}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TransactionsTable;
