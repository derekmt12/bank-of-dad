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

function BalanceChart({ transactions }) {
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
    <section className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-6">
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-slate-900">Balance over time</h2>
        <p className="text-sm text-slate-500">Ledger balance after each entry.</p>
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
  );
}

export default BalanceChart;
