# Trade-In — Indian Markets Dashboard

A modern, high-performance financial dashboard web application built with **React**, **Vite**, **Redux Toolkit**, and **Google Gemini AI**. Designed for tracking Indian financial markets in real time, featuring live ticker updates, portfolio analytics, asset fundamentals, order book simulations, and an intelligent financial co-pilot assistant.

---

## 🌟 Key Features

- **Live Market Dashboard**: Real-time simulated price tracking for Indian market assets, Crypto (BTC/INR, ETH/INR), and Forex currency pairs.
- **Ask Trade-In AI Assistant**: An AI-powered interactive financial advisor powered by Google Gemini, offering instant insights into Indian market trends, tax concepts (STCG vs LTCG), portfolio diversification, and risk analysis.
- **Portfolio Management**: Secure demo authentication for investor accounts (`TRADER001`, `TRADER002`, `TRADER003`) with interactive asset allocation breakdowns, profit/loss calculations, and transaction histories.
- **Deep Asset Analytics**: Individual asset drill-downs featuring interactive charting, live order book depths, key financial metrics, and company fundamentals.
- **Ultra-Responsive Dark UI**: Designed with custom typography (Syne & JetBrains Mono), neon accents, glassmorphic styling, and full accessibility compliance (WCAG standards with skip links and ARIA labels).

---

## 🚀 Tech Stack

- **Frontend**: React 18, Vite 5
- **State Management**: Redux Toolkit & React-Redux
- **Routing**: React Router DOM v6
- **Forms & Validation**: Formik & Yup
- **Icons**: Lucide React
- **AI Integration**: Google Gemini API via REST
- **Styling**: Vanilla CSS3 design system with CSS custom properties

---

## 🛠️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/heavenpreet8542beaift25-sketch/Trade-In.git
cd Trade-In
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env` and provide your Google Gemini API key:
```bash
cp .env.example .env
```
Add your key:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run the development server
```bash
npm run dev
```

### 5. Build for production
```bash
npm run build
npm run preview
```

---

## 🔐 Demo Accounts

To test the portfolio features, enter one of the demo account IDs on the **Portfolio Access** login page:
- `TRADER001` — Aggressive Tech & Crypto Portfolio
- `TRADER002` — Balanced Bluechip & Index Portfolio
- `TRADER003` — Conservative Debt & Gold Portfolio

---

## 📂 Project Architecture

```
Trade-In/
├── public/
├── src/
│   ├── components/
│   │   ├── common/         # AskTradeInAI co-pilot assistant
│   │   ├── forms/          # Formik + Yup Portfolio Access LoginForm
│   │   └── portfolio/      # InvestmentCards and holding summaries
│   ├── context/            # AuthContext (session state management)
│   ├── pages/              # DashboardPage, PortfolioPage, AssetDetailPage
│   ├── routes/             # AppRoutes and ProtectedRoute wrapper
│   ├── store/              # Redux store & slices (marketSlice, portfolioSlice)
│   ├── styles/             # Global CSS design tokens and layout styling
│   ├── utils/              # Currency (INR) and date formatters
│   ├── App.jsx             # Top-level shell with navigation and footer
│   └── main.jsx            # Application entry point
├── .env.example
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

---

## 📜 Academic Project Notice

Developed for **Chitkara University — Front End Engineering-II (FEE-2)** evaluation. Simulated data is intended strictly for educational and demonstration purposes.
