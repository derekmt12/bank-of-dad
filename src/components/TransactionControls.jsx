import { useState } from "react";
import { useDispatch } from "react-redux";
import { addInterest, deposit, withdraw } from "../store/transactionSlice";

const todayLocal = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const toIsoDate = (dateStr) => {
  const [year, month, day] = dateStr.split("-").map(Number);
  const local = new Date(year, month - 1, day, 12, 0, 0); // noon local avoids timezone day shifts
  return local.toISOString();
};

export function TransactionControls() {
  const dispatch = useDispatch();
  const [active, setActive] = useState("deposit");
  const [amount, setAmount] = useState(0);
  const [memo, setMemo] = useState("");
  const [date, setDate] = useState(todayLocal());
  const [rate, setRate] = useState(1);

  const reset = () => {
    setAmount(0);
    setMemo("");
    setDate(todayLocal());
  };

  const submit = (e) => {
    e.preventDefault();
    const isoDate = toIsoDate(date);
    if (active === "deposit") {
      dispatch(deposit({ amount, memo, date: isoDate }));
    } else if (active === "withdraw") {
      dispatch(withdraw({ amount, memo, date: isoDate }));
    } else {
      dispatch(addInterest({ rate: rate / 100, date: isoDate, memo: memo || "Interest applied" }));
    }
    reset();
  };

  const actionLabel =
    active === "deposit" ? "Deposit" : active === "withdraw" ? "Withdraw" : "Add interest";

  return (
    <section className="mb-6 rounded-2xl border-2 border-amber-200 bg-white/90 p-3 shadow-lg shadow-amber-100 sm:p-4">
      <form className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-end" onSubmit={submit}>
        <div className="flex flex-wrap gap-2">
          {[
            { key: "deposit", label: "Deposit" },
            { key: "withdraw", label: "Withdraw" },
            { key: "interest", label: "Add interest" },
          ].map((btn) => (
            <button
              key={btn.key}
              type="button"
              onClick={() => setActive(btn.key)}
              className={`rounded-full px-3 py-1.5 text-sm font-semibold ring-2 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-1 ${
                active === btn.key
                  ? "bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-400 text-white ring-transparent shadow"
                  : "bg-white text-slate-700 ring-slate-200 hover:bg-emerald-50"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <div className="flex flex-1 flex-col gap-1 min-w-[160px]">
          <label className="text-xs font-semibold text-slate-600">Amount</label>
          <input
            type="number"
            step="0.01"
            min="0"
            required
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        <div className="flex flex-1 flex-col gap-1 min-w-[200px]">
          <label className="text-xs font-semibold text-slate-600">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        {active === "interest" ? (
          <div className="flex w-32 flex-col gap-1">
            <label className="text-xs font-semibold text-slate-600">Rate (%)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </div>
        ) : null}

        <div className="flex min-w-[200px] flex-1 flex-col gap-1">
          <label className="text-xs font-semibold text-slate-600">Memo</label>
          <input
            type="text"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="Optional note"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-emerald-500 via-cyan-500 to-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-emerald-300"
          >
            {actionLabel}
          </button>
        </div>
      </form>
    </section>
  );
}
