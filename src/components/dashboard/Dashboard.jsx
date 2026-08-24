import { useState } from 'react';
import { MARKETS } from '../../data/markets.js';
import { META } from '../../data/meta.js';
import { DEMO_PORTFOLIO } from '../../data/accounts.js';
import { NEWS } from '../../data/news.js';
import Hero from './Hero.jsx';
import TradingViewChart from './TradingViewChart.jsx';
import MarketList from './MarketList.jsx';
import OrderBook from './OrderBook.jsx';
import ScreenerSection from './Screener.jsx';
import AllocationPieChart from './AllocationPieChart.jsx';
import AllocationLegend from './AllocationLegend.jsx';
import AlertsList from './AlertsList.jsx';
import InvestmentGrid from './InvestmentGrid.jsx';
import NewsGrid from './NewsGrid.jsx';
import HotLists from './HotLists.jsx';
import Footer from '../layout/Footer.jsx';

const SYMBOL_TABS = [
  { sym: 'BITSTAMP:BTCUSD', label: 'BTC/USD' },
  { sym: 'BITSTAMP:ETHUSD', label: 'ETH/USD' },
  { sym: 'BINANCE:SOLUSDT', label: 'SOL' },
  { sym: 'FX_IDC:USDINR', label: 'USD/INR' },
  { sym: 'FX_IDC:EURINR', label: 'EUR/INR' },
  { sym: 'NSE:NIFTY', label: 'NIFTY' },
  { sym: 'COMEX:GC1!', label: 'Gold' }
];

// Props:
//   prices - live price map from the useLivePrices hook (lifted to App)
//   onOpenDetail(assetId) - navigate to the detail page for an asset
//   onGoToPortfolio() - navigate to the portfolio page
export default function Dashboard({ prices, onOpenDetail, onGoToPortfolio }) {
  const [chartSymbol, setChartSymbol] = useState(SYMBOL_TABS[0].sym);
  const [selectedAsset, setSelectedAsset] = useState('BTC');

  const selectAsset = (id) => {
    setSelectedAsset(id);
    const sym = META[id]?.tvSym;
    if (sym) setChartSymbol(sym);
  };

  const obAssetName =
    [...MARKETS.crypto, ...MARKETS.forex].find((m) => m.id === selectedAsset)?.name || selectedAsset;

  return (
    <div id="page-dashboard" className="page active">
      <Hero prices={prices} onSelectAsset={selectAsset} />

      <div className="main-layout" id="chartsAnchor">
        <section className="tv-section" aria-label="Live price chart">
          <header className="tv-header">
            <div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700 }}>Live Chart — TradingView</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>Real market data • Powered by TradingView</div>
            </div>
            <nav className="tv-tabs" role="tablist" aria-label="Symbol selector">
              {SYMBOL_TABS.map((tab) => (
                <button
                  key={tab.sym}
                  className={`tv-tab${chartSymbol === tab.sym ? ' active' : ''}`}
                  role="tab"
                  aria-selected={chartSymbol === tab.sym}
                  onClick={() => setChartSymbol(tab.sym)}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </header>
          <TradingViewChart symbol={chartSymbol} height={520} />
        </section>

        <aside className="sidebar" aria-label="Market data">
          <MarketList title="🪙 Crypto / INR" items={MARKETS.crypto} prices={prices} onSelect={selectAsset} />
          <MarketList title="💱 Forex / INR" items={MARKETS.forex} prices={prices} onSelect={selectAsset} />
          <OrderBook assetName={obAssetName} price={prices[selectedAsset]} />
        </aside>
      </div>

      <ScreenerSection />

      <section className="portfolio-overview" aria-label="Portfolio overview">
        <div className="pie-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 className="section-title">Portfolio <span>Overview</span></h2>
            <button className="btn-primary" onClick={onGoToPortfolio} style={{ fontSize: 11, padding: '6px 14px' }}>View Full →</button>
          </div>
          <div className="pie-container">
            <AllocationPieChart holdings={DEMO_PORTFOLIO} size={200} centerLabel="INVESTED" />
            <div style={{ flex: 1 }}><AllocationLegend holdings={DEMO_PORTFOLIO} /></div>
          </div>
        </div>
        <AlertsList />
      </section>

      <section className="portfolio-preview" aria-label="My investments">
        <div className="section-header">
          <h2 className="section-title">My <span>Investments</span></h2>
          <button className="btn-primary" onClick={onGoToPortfolio}>Full Portfolio →</button>
        </div>
        <InvestmentGrid holdings={DEMO_PORTFOLIO} prices={prices} onOpen={(id) => onOpenDetail(id, null)} />
      </section>

      <section id="newsAnchor" style={{ maxWidth: 1600, margin: '0 auto', padding: '0 32px 32px' }}>
        <div className="section-header">
          <h2 className="section-title">Hot <span>Lists</span></h2>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>TradingView Real Data</span>
        </div>
        <HotLists />
        <div className="section-header">
          <h2 className="section-title">Market <span>News</span></h2>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Auto-refreshing</span>
        </div>
        <NewsGrid items={NEWS} />
      </section>

      <Footer />
    </div>
  );
}
