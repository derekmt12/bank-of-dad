import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency, formatDate, formatShortDate } from "../utils/formatters";

export function BalanceChart({ transactions }) {
  const chartData = useMemo(() => {
    const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    return sorted.reduce((acc, tx) => {
      const interestEarned = (acc.at(-1)?.interestEarned || 0) + (tx.type === "interest" ? tx.amount : 0);
      const balance = tx.balance;
      const principal = Math.max(balance - interestEarned, 0);
      acc.push({
        date: tx.date,
        label: formatShortDate(tx.date),
        balance,
        interestEarned,
        principal,
      });
      return acc;
    }, []);
  }, [transactions]);

  return (
    <section className="self-start rounded-2xl border-2 border-fuchsia-200 bg-white/90 p-4 shadow-xl shadow-fuchsia-100 sm:p-6">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold text-fuchsia-700 drop-shadow-sm">Balance over time</h2>
          <p className="text-sm font-semibold text-fuchsia-500">Principal vs. interest contribution.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
          <span className="inline-flex items-center gap-1 rounded-full bg-lime-100 px-2 py-1 text-lime-800 ring-1 ring-lime-200">
            <span className="h-2 w-2 rounded-full bg-lime-500" aria-hidden /> Principal
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-fuchsia-100 px-2 py-1 text-fuchsia-800 ring-1 ring-fuchsia-200">
            <span className="h-2 w-2 rounded-full bg-fuchsia-500" aria-hidden /> Interest
          </span>
        </div>
      </div>
      {chartData.length === 0 ? (
        <div className="flex h-64 items-center justify-center text-sm text-slate-500">
          Add transactions to see the chart.
        </div>
      ) : (
        <div className="h-64 sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="balanceGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#84cc16" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#a3e635" stopOpacity={0.08} />
                </linearGradient>
                <linearGradient id="interestGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#ec4899" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#f472b6" stopOpacity={0.08} />
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
                dataKey="principal"
                stackId="1"
                stroke="#65a30d"
                strokeWidth={2}
                fill="url(#balanceGradient)"
                dot={false}
                activeDot={{ r: 4, fill: "#047857" }}
              />
              <Area
                type="monotone"
                dataKey="interestEarned"
                stackId="1"
                stroke="#db2777"
                strokeWidth={2}
                fill="url(#interestGradient)"
                dot={{ r: 3, fill: "#db2777", strokeWidth: 0 }}
                activeDot={{ r: 4, fill: "#9d174d" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}

