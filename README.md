# Bank of Dad

A totally vibe-coded, kid-friendly savings tracker where a parent can log deposits, withdrawals, and interest for a child’s account. The UI is bright, playful, and highlights interest growth with animations and confetti when new $100 milestones are reached.

## Features
- Transaction list with deposits, withdrawals, and interest entries (hover shimmer on interest rows).
- Inline controls for quick add: amount, memo, date, and custom interest rate.
- Live balance and stacked principal vs. interest chart (Recharts).
- Celebration confetti when balance crosses each $100 bucket.
- Built with React, Redux Toolkit, Tailwind CSS v4, Vite, and Recharts.

## Getting Started
1. Install dependencies:
	```bash
	npm install
	```
2. Run the dev server:
	```bash
	npm run dev
	```
3. Open the printed local URL in your browser.

## Scripts
- `npm run dev` — start Vite dev server.
- `npm run build` — production build.
- `npm run preview` — preview the production build locally.
- `npm run lint` — run ESLint.

## Notes
- Data is in-memory; refresh resets to seeded transactions in `src/store/transactionSlice.js`.
- Tailwind classes live inline; global styles and animations in `src/index.css`.
- Balance milestones use client time and rounding to the nearest cent; confetti triggers when crossing into a new $100 bucket.
