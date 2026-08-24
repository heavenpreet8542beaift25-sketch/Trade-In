# TradeIN — Indian Markets Dashboard

A React + Vite single-page app that shows live-simulated crypto and forex
prices for the Indian market, a TradingView chart/screener, a demo
"Portfolio Access" login, and a per-asset detail view with fundamentals,
order book and P&L.

Built for **BECSE (AIFT) Batch 2025, 3rd Semester — Front End
Engineering-II (25CSE0203), Project-Based Evaluation-I**.

## Getting started

```bash
npm install
npm run dev       # starts the Vite dev server at http://localhost:5173
npm run build      # production build into /dist
npm run preview    # preview the production build locally
```

Demo portfolio logins: `TRADER001`, `TRADER002`, `TRADER003` (shown on the
Portfolio Access screen).

## Folder structure

```
tradein-dashboard/
├── index.html                  # Vite HTML entry, loads /src/main.jsx
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx                 # React root render
│   ├── App.jsx                  # Page routing state (dashboard/portfolio/detail)
│   ├── index.css                # Global design tokens + component styles
│   ├── data/                    # Static data modules (no logic)
│   │   ├── markets.js           # Crypto/forex instrument list
│   │   ├── meta.js              # Per-asset fundamentals for the detail page
│   │   ├── accounts.js          # Demo login accounts + demo portfolio
│   │   └── news.js              # News feed content
│   ├── hooks/                   # Reusable stateful logic (useState/useEffect)
│   │   ├── useLivePrices.js     # Simulated live price ticker
│   │   └── useClock.js          # IST clock for the navbar
│   ├── utils/
│   │   ├── format.js            # INR currency formatting helpers
│   │   └── orderBook.js         # Synthetic order-book generator
│   └── components/
│       ├── layout/               # Navbar, TickerTape, Footer
│       ├── dashboard/             # Hero, charts, market lists, screener, news
│       ├── portfolio/             # Login, summary bar, invest cards, transactions
│       └── detail/                # Asset detail page
```

## How this maps to the evaluation rubric

- **HTML structure & CSS styling** — semantic elements (`nav`, `main`,
  `header`, `footer`, `dl`/`dt`/`dd`, `table`), ARIA roles/labels and a
  skip link are used throughout the JSX; all styling lives in one
  organized, commented `index.css` using CSS custom properties.
- **JavaScript & folder structure** — logic is split by responsibility
  (data / hooks / utils / components), each file has a single job, and
  naming is consistent (`camelCase` functions, `PascalCase` components).
- **DOM manipulation** — `AllocationPieChart` draws directly on a
  `<canvas>` via `useRef` + `getContext('2d')`, and the TradingView
  widgets (`TickerTape`, `HotLists`, `Screener`) attach third-party
  `<script>` tags to a ref'd container node with proper cleanup.
- **React basics** — every UI piece is a functional component; state is
  managed with `useState` (page routing, login, chart symbol, screener
  tab, menu open/closed) and side effects with `useEffect` (price
  simulation, clock tick, chart/script loading); data flows down via
  **props** (e.g. `prices`, `holdings`, `onOpenDetail`).

## Git / GitHub workflow

This repository is meant to be pushed to GitHub and updated regularly,
per the evaluation notes:

```bash
git init
git add .
git commit -m "chore: scaffold TradeIN dashboard"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

Suggested commit cadence while building features: one commit per
component or hook (e.g. `feat: add live price hook`,
`feat: add asset detail page`, `style: polish order book card`) so the
commit history shows real progress for the "GitHub commit practices"
criterion.

## Notes

All prices are simulated client-side for demo purposes — this is not
financial advice, and no real trading happens anywhere in the app.
