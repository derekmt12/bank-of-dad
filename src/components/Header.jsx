import { formatCurrency } from "../utils/formatters";

export function Header({ balance }) {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">Current Balance</p>
        <p className="text-3xl font-semibold text-slate-900">
          {formatCurrency(balance)}
        </p>
      </div>
      <div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
        Bank of Dad Ledger
      </div>
    </header>
  );
}

