import { formatCurrency, formatDate } from "../utils/formatters";

const typeLabels = {
  deposit: "Deposit",
  withdraw: "Withdrawal",
  interest: "Interest",
};

const typePillClasses = {
  deposit: "bg-lime-100 text-lime-800 ring-lime-200",
  withdraw: "bg-orange-100 text-orange-800 ring-orange-200",
  interest: "bg-fuchsia-100 text-fuchsia-800 ring-fuchsia-200",
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
            <p className="text-lg font-extrabold text-sky-900 leading-tight drop-shadow-sm">{tx.memo || typeLabels[tx.type] || "—"}</p>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-sky-500">
            {formatDate(tx.date)}
          </p>
        </div>
      </div>

      <div className="text-right sm:justify-self-end">
        <div
          className={`text-xl font-extrabold tabular-nums leading-tight drop-shadow-sm ${
            tx.type === "withdraw" ? "text-orange-600" : "text-emerald-700"
          }`}
        >
          {tx.type === "withdraw" ? "-" : "+"}
          {formatCurrency(Math.abs(tx.amount))}
        </div>
          <div className="text-[11px] font-semibold text-sky-500">Balance {formatCurrency(tx.balance)}</div>
      </div>
    </article>
  );
}

