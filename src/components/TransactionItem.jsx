import { formatCurrency, formatDate } from "../utils/formatters";

const typeLabels = {};

export function TransactionItem({ tx }) {
  const isInterest = tx.type === "interest";

  return (
    <article
      className={`animate-transaction-pop flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 ${
        isInterest
          ? "interest-shimmer relative isolate rounded-xl bg-gradient-to-r from-fuchsia-50 via-pink-50 to-amber-50 ring-2 ring-fuchsia-200 shadow mx-[-12px] sm:mx-[-16px]"
          : ""
      }`}
    >
      {isInterest && (
        <span className="pointer-events-none absolute -left-2 -right-2 top-1/2 h-[72%] -translate-y-1/2 rounded-xl bg-gradient-to-r from-fuchsia-200/40 via-amber-200/30 to-fuchsia-200/40 blur-md" aria-hidden />
      )}
      <div className="space-y-1 min-w-[0]">
        <p className={`text-lg font-extrabold leading-tight drop-shadow-sm ${isInterest ? "text-fuchsia-700" : "text-sky-900"}`}>
          {isInterest ? "Interest earned" : tx.memo || "Savings update"}
        </p>
        <p className={`text-[11px] font-semibold uppercase tracking-wide ${isInterest ? "text-fuchsia-500" : "text-sky-500"}`}>
          {formatDate(tx.date)}
        </p>
      </div>

      <div className="text-right sm:justify-self-end">
        <div
          className={`text-xl font-extrabold tabular-nums leading-tight drop-shadow-sm ${
            tx.type === "withdraw" ? "text-orange-600" : isInterest ? "text-fuchsia-700" : "text-emerald-700"
          }`}
        >
          {tx.type === "withdraw" ? "-" : "+"}
          {formatCurrency(Math.abs(tx.amount))}
        </div>
        <div className={`text-[11px] font-semibold ${isInterest ? "text-fuchsia-600" : "text-sky-500"}`}>
          Balance {formatCurrency(tx.balance)}
        </div>
      </div>
    </article>
  );
}

