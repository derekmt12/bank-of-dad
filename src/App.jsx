import confetti from "canvas-confetti";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { BalanceChart } from "./components/BalanceChart";
import { Header } from "./components/Header";
import { TransactionControls } from "./components/TransactionControls";
import { TransactionsTable } from "./components/TransactionsTable";

export function App() {
  const { balance, transactions } = useSelector((state) => state.transactions);
  const milestoneRef = useRef({ lastBucket: Math.floor(balance / 100) });

  useEffect(() => {
    const prevBucket = milestoneRef.current.lastBucket;
    const currBucket = Math.floor((balance + 0.005) / 100); // small epsilon for float fuzz

    if (currBucket > prevBucket) {
      milestoneRef.current = { lastBucket: currBucket };

      const bursts = [
        () =>
          confetti({
            particleCount: 70,
            spread: 80,
            startVelocity: 36,
            origin: { y: 0.25 },
            ticks: 200,
          }),
        () =>
          confetti({
            particleCount: 55,
            spread: 70,
            startVelocity: 32,
            angle: 60,
            origin: { x: 0.2, y: 0.3 },
            ticks: 200,
          }),
        () =>
          confetti({
            particleCount: 55,
            spread: 70,
            startVelocity: 32,
            angle: 120,
            origin: { x: 0.8, y: 0.3 },
            ticks: 200,
          }),
      ];

      const timers = bursts.map((fn, idx) => setTimeout(fn, idx * 160));
      return () => timers.forEach(clearTimeout);
    }

    milestoneRef.current = { lastBucket: currBucket };
    return undefined;
  }, [balance]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-sky-50 to-emerald-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Header balance={balance} />

        <TransactionControls />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-[2fr,1fr]">
          <TransactionsTable transactions={transactions} />
          <BalanceChart transactions={transactions} />
        </div>
      </div>
    </main>
  );
}

