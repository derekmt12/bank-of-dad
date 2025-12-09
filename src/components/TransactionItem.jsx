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

export function TransactionItem({ tx }) {
  return (
    <article className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6">
      <div className="flex items-start gap-3 sm:items-center">
        <span
          className={`inline-flex min-w-[110px] justify-center rounded-full px-3 py-1 text-[11px] font-semibold ring-1 ${
            typePillClasses[tx.type] || "bg-slate-100 text-slate-700 ring-slate-200"
          }`}
        >
          {typeLabels[tx.type] || tx.type}
        </span>

        <div className="space-y-1 min-w-[0]">
          <p className="text-base font-semibold text-slate-900 leading-tight">{tx.memo || typeLabels[tx.type] || "—"}</p>
          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
            {formatDate(tx.date)}
          </p>
        </div>
      </div>

      <div className="text-right sm:justify-self-end">
        <div
          className={`text-lg font-semibold tabular-nums leading-tight ${
            tx.type === "withdraw" ? "text-rose-700" : "text-emerald-700"
          }`}
        >
          {tx.type === "withdraw" ? "-" : "+"}
          {formatCurrency(Math.abs(tx.amount))}
        </div>
        <div className="text-[11px] text-slate-500">Balance {formatCurrency(tx.balance)}</div>
      </div>
    </article>
  );
}

