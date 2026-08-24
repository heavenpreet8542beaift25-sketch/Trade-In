import Login from './Login.jsx';
import SummaryBar from './SummaryBar.jsx';
import InvestCard from './InvestCard.jsx';
import TransactionTable from './TransactionTable.jsx';
import PortfolioNews from './PortfolioNews.jsx';
import AllocationPieChart from '../dashboard/AllocationPieChart.jsx';
import AllocationLegend from '../dashboard/AllocationLegend.jsx';
import TradingViewChart from '../dashboard/TradingViewChart.jsx';
import Footer from '../layout/Footer.jsx';
import { ACCOUNTS } from '../../data/accounts.js';

// Props:
//   account  - signed-in account id, or null when logged out
//   prices   - live price map
//   onLogin(accountId) - called when a demo account is chosen
//   onOpenDetail(assetId, accountId) - navigate to the detail page
export default function Portfolio({ account, prices, onLogin, onOpenDetail }) {
  if (!account) {
    return (
      <div id="page-portfolio" className="page active">
        <Login onLogin={onLogin} />
      </div>
    );
  }

  const portfolio = ACCOUNTS[account].portfolio;

  return (
    <div id="page-portfolio" className="page active">
      <div id="portfolioScreen" style={{ display: 'block' }}>
        <div className="port-header">
          <div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: 2, marginBottom: 4 }}>PORTFOLIO OVERVIEW</div>
            <h1 className="port-title">My <span>Investments</span></h1>
          </div>
          <div className="port-account-badge" aria-live="polite">
            <div className="port-account-dot" />
            <span style={{ fontSize: 12, fontWeight: 600 }}>{account}</span>
            <span style={{ fontSize: 10, color: 'var(--text-muted)', marginLeft: 4 }}>● LIVE</span>
          </div>
        </div>

        <SummaryBar portfolio={portfolio} prices={prices} />

        <section className="port-chart-section" aria-label="Asset charts">
          <div className="port-chart-header">
            <div>
              <div className="port-chart-title">Asset Performance — TradingView Live</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>Real-time data</div>
            </div>
          </div>
          <div style={{ width: '100%', height: 300, overflow: 'hidden' }}>
            <TradingViewChart symbol={ACCOUNTS[account].portfolio[0].id === 'BTC' ? 'BITSTAMP:BTCUSD' : 'FX_IDC:USDINR'} height={300} studies={false} />
          </div>
        </section>

        <section className="investments-grid">
          {portfolio.map((p, i) => (
            <InvestCard
              key={p.id}
              holding={p}
              currentPrice={prices[p.id] || p.buyPrice}
              delay={i * 0.07}
              onOpen={() => onOpenDetail(p.id, account)}
            />
          ))}
        </section>

        <div className="port-bottom">
          <div className="card" style={{ padding: 24 }}>
            <div className="section-title-sm">Allocation</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <AllocationPieChart holdings={portfolio} size={180} centerLabel="TOTAL" />
              <div style={{ width: '100%' }}><AllocationLegend holdings={portfolio} /></div>
            </div>
          </div>
          <TransactionTable portfolio={portfolio} />
        </div>

        <div style={{ marginBottom: 32 }}>
          <div className="section-header"><h2 className="section-title">Market <span>News</span></h2></div>
          <PortfolioNews />
        </div>
      </div>
      <Footer />
    </div>
  );
}
