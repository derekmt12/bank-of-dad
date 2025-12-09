
import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);

const formatDate = (value) =>
  new Date(value).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const formatShortDate = (value) =>
  new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

function App() {
  const { balance, transactions } = useSelector((state) => state.transactions);

  const chartData = useMemo(() => {
    return [...transactions]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map((tx) => ({
        date: tx.date,
        label: formatShortDate(tx.date),
        balance: tx.balance,
      }));
  }, [transactions]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
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

        <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <section className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
            <div className="border-b border-slate-200 px-4 py-3 sm:px-6">
              <h2 className="text-lg font-semibold text-slate-900">Transactions</h2>
              <p className="text-sm text-slate-500">
                Date, type, memo, and amount for each entry.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold text-slate-700 sm:px-6">
                      Date
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold text-slate-700 sm:px-6">
                      Type
                    </th>
                    <th className="px-4 py-3 font-semibold text-slate-700 sm:px-6">Memo</th>
                    <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-slate-700 sm:px-6">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {transactions.length === 0 ? (
                    <tr>
                      <td
                        className="px-4 py-6 text-center text-slate-500 sm:px-6"
                        colSpan={4}
                      >
                        No transactions yet.
                      </td>
                    </tr>
                  ) : (
                    transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-50">
                        <td className="whitespace-nowrap px-4 py-3 text-slate-800 sm:px-6">
                          {formatDate(tx.date)}
                        </td>
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
                              tx.type === "withdraw"
                                ? "text-rose-700"
                                : "text-emerald-700"
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

          <section className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-6">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Balance over time</h2>
                <p className="text-sm text-slate-500">Ledger balance after each entry.</p>
              </div>
            </div>
            {chartData.length === 0 ? (
              <div className="flex h-64 items-center justify-center text-sm text-slate-500">
                Add transactions to see the chart.
              </div>
            ) : (
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="balanceGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#34d399" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="label" tick={{ fill: "#475569", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis
                      tickFormatter={(v) => formatCurrency(v)}
                      tick={{ fill: "#475569", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      formatter={(value) => formatCurrency(value)}
                      labelFormatter={(label, payload) =>
                        payload && payload[0]?.payload?.date ? formatDate(payload[0].payload.date) : label
                      }
                      contentStyle={{ borderRadius: 12, borderColor: "#e2e8f0" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="balance"
                      stroke="#10b981"
                      strokeWidth={2}
                      fill="url(#balanceGradient)"
                      dot={{ r: 3, fill: "#10b981", strokeWidth: 0 }}
                      activeDot={{ r: 5, fill: "#047857" }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default App;
