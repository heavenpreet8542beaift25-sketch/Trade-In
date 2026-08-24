import { useState } from 'react';
import Navbar from './components/layout/Navbar.jsx';
import TickerTape from './components/layout/TickerTape.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import Portfolio from './components/portfolio/Portfolio.jsx';
import AssetDetail from './components/detail/AssetDetail.jsx';
import { useLivePrices } from './hooks/useLivePrices.js';

export default function App() {
  const prices = useLivePrices();

  const [page, setPage] = useState('dashboard');
  const [lastPage, setLastPage] = useState('dashboard');
  const [account, setAccount] = useState(null);
  const [detail, setDetail] = useState({ assetId: null, account: null });

  const navigate = (target) => {
    setPage(target);
    setLastPage(target);
  };

  const openDetail = (assetId, detailAccount) => {
    setDetail({ assetId, account: detailAccount });
    setPage('detail');
  };

  const backFromDetail = () => setPage(lastPage);

  const handleLogin = (accountId) => setAccount(accountId);
  const handleLogout = () => {
    setAccount(null);
    navigate('portfolio');
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <TickerTape />
      <Navbar page={page} isLoggedIn={Boolean(account)} onNavigate={navigate} onLogout={handleLogout} />

      <main id="main-content">
        {page === 'dashboard' && (
          <Dashboard
            prices={prices}
            onOpenDetail={openDetail}
            onGoToPortfolio={() => navigate('portfolio')}
          />
        )}

        {page === 'portfolio' && (
          <Portfolio
            account={account}
            prices={prices}
            onLogin={handleLogin}
            onOpenDetail={openDetail}
          />
        )}

        {page === 'detail' && (
          <AssetDetail
            assetId={detail.assetId}
            account={detail.account}
            prices={prices}
            onBack={backFromDetail}
          />
        )}
      </main>
    </>
  );
}
