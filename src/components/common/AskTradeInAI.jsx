import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Bot, Send, X, Sparkles, RefreshCw, Key, Check, HelpCircle } from 'lucide-react';
import { fmt } from '../../utils/formatters';

// Expert financial rule engine that provides deep, contextual analysis when offline or when API key is unconfigured/invalid
function generateLocalFinancialAnalysis(query, account, activeAccountId, prices) {
  const q = query.toLowerCase();

  // 1. Portfolio Risk Analysis
  if (q.includes('risk') || q.includes('portfolio') || q.includes('holding') || q.includes('loss') || q.includes('profit')) {
    if (!account || !account.portfolio || account.portfolio.length === 0) {
      return `📊 **Portfolio Risk Assessment**:

• **Account Status**: Guest Mode (No portfolio currently loaded).
• **Action Required**: Log in with demo credentials (**TRADER001**, **TRADER002**, or **TRADER003**) on the **Portfolio Access** page to view live asset exposure and P&L analytics.
• **Baseline Risk Guidance**: Maintain at least 60% of your portfolio in index funds (NIFTY 50 / SENSEX) or high-grade sovereign debt to withstand market drawdowns.`;
    }

    const totalInvested = account.portfolio.reduce((sum, item) => sum + (item.invested || 0), 0);
    const cryptoInvested = account.portfolio
      .filter((p) => p.market === 'Crypto')
      .reduce((sum, p) => sum + p.invested, 0);
    const forexInvested = account.portfolio
      .filter((p) => p.market === 'Forex')
      .reduce((sum, p) => sum + p.invested, 0);

    const cryptoPct = totalInvested > 0 ? ((cryptoInvested / totalInvested) * 100).toFixed(1) : 0;
    const forexPct = totalInvested > 0 ? ((forexInvested / totalInvested) * 100).toFixed(1) : 0;

    let riskTier = 'Moderate (Balanced)';
    let riskAdvice = 'Your capital is distributed across multiple asset classes with controlled drawdowns.';

    if (Number(cryptoPct) > 50) {
      riskTier = 'High / Aggressive';
      riskAdvice = `**Heavy Crypto Allocation (${cryptoPct}%)**: High sensitivity to global digital asset swings. Consider setting trailing stop-losses between 5% and 8% on volatile tokens.`;
    } else if (Number(forexPct) > 50) {
      riskTier = 'Conservative / Low Volatility';
      riskAdvice = `**Forex-Weighted Capital (${forexPct}%)**: Low equity beta and excellent capital preservation. Consider adding domestic equities to outpace Indian retail inflation.`;
    }

    const holdingsSummary = account.portfolio
      .map((p) => `• **${p.name}** (${p.market}): ${fmt(p.invested)} invested`)
      .join('\n');

    return `📊 **Comprehensive Risk Assessment (${activeAccountId || 'Active Account'})**:

• **Risk Profile**: **${riskTier}**
• **Total Capital Invested**: **${fmt(totalInvested)}**
• **Asset Exposure**:
  - 🪙 **Crypto**: ${cryptoPct}% (${fmt(cryptoInvested)})
  - 💱 **Forex**: ${forexPct}% (${fmt(forexInvested)})

**Current Holdings Breakdown**:
${holdingsSummary}

**Recommended Action Steps**:
• ${riskAdvice}
• **Trailing Stop-Loss**: Enforce disciplined stop-loss rules for high-beta tokens.
• **Rebalancing Target**: Target a 15–20% allocation in blue-chip index funds (NIFTY 50 / SENSEX) for enhanced downside cushion.`;
  }

  // 2. BTC / Crypto Outlook
  if (q.includes('btc') || q.includes('bitcoin') || q.includes('crypto') || q.includes('eth') || q.includes('sol')) {
    const liveBtc = prices.BTC ? fmt(prices.BTC) : '₹58,42,000';
    const liveEth = prices.ETH ? fmt(prices.ETH) : '₹3,18,500';
    const liveSol = prices.SOL ? fmt(prices.SOL) : '₹14,800';

    return `🪙 **Cryptocurrency & BTC/INR Outlook**:

• **Live Market Prices (Redux Real-Time Ticker)**:
  - **BTC/INR**: **${liveBtc}**
  - **ETH/INR**: **${liveEth}**
  - **SOL/INR**: **${liveSol}**
• **Technical Key Levels (BTC)**:
  - **Immediate Resistance**: ₹61,20,000 (Consolidation ceiling)
  - **Support Baseline**: ₹56,50,000 (200-period Exponential Moving Average)
• **Market Trend**: Neutral-Bullish with steady institutional spot ETF inflows.
• **Indian Regulatory & Tax Note (Section 115BBH)**:
  - All crypto gains are taxed at a **flat 30%** plus applicable 4% cess.
  - **1% TDS** applies on all sell/transfer transactions over ₹50,000 under Section 194S.
  - Loss offset against other income heads is strictly disallowed.`;
  }

  // 3. Indian Tax (STCG vs LTCG)
  if (q.includes('tax') || q.includes('stcg') || q.includes('ltcg') || q.includes('budget') || q.includes('income tax')) {
    return `⚖️ **Indian Capital Gains Tax Guide (Budget 2024 Updated)**:

1. **Short-Term Capital Gains (STCG)**:
• **Listed Equities & Equity Mutual Funds**: **20%** (Section 111A, raised from 15% in Budget 2024).
• **Applicable Duration**: Held for less than **12 months**.

2. **Long-Term Capital Gains (LTCG)**:
• **Listed Equities & Equity Mutual Funds**: **12.5%** (Section 112A, raised from 10%).
• **Exemption Threshold**: Gains up to **₹1,25,000** per financial year are completely tax-exempt.
• **Applicable Duration**: Held for more than **12 months**.

3. **Virtual Digital Assets (Crypto & NFTs)**:
• **Flat 30% Tax** under Section 115BBH regardless of holding timeline.
• **1% TDS** at source under Section 194S.
• No deduction for business expenses or losses against other asset classes.

4. **Forex & Currency Derivatives**:
• Classified as non-speculative business income, taxed as per your standard individual income tax slab.`;
  }

  // 4. Diversification Strategy
  if (q.includes('diversif') || q.includes('strategy') || q.includes('allocat') || q.includes('advice')) {
    return `🎯 **Strategic Asset Diversification Guide**:

• **The 50/30/15/5 Indian Market Framework**:
  - **50% Core Equities**: NIFTY 50 & NIFTY Next 50 index funds for inflation-beating long-term compounding.
  - **30% Fixed Income / Debt**: Sovereign Gold Bonds (SGB), RBI Floating Rate Bonds, or high-rated Corporate Debt.
  - **15% Global / Forex Exposure**: USD/INR hedges to cushion domestic currency depreciation.
  - **5% Satellite / High Alpha**: Tactical crypto holdings (BTC/ETH) with clear profit-booking milestones.
• **Discipline Checklist**: Rebalance semi-annually or whenever any asset deviates by more than 5% from target weights.`;
  }

  // 5. Stocks, NIFTY, SENSEX, Indian Macro
  if (q.includes('nifty') || q.includes('sensex') || q.includes('stock') || q.includes('share') || q.includes('market') || q.includes('bse') || q.includes('nse')) {
    return `📈 **Indian Equities & Macro Indicators**:

• **NIFTY 50 Trend**: Demonstrating resilient structural support underpinned by consistent Domestic Institutional Investor (DII) systematic inflows.
• **Benchmark Valuation**: 12-month forward P/E stands near historical fair value (~21.8x).
• **Sector Leaders**:
  - **Banking & Financials**: Strong credit growth and healthy asset quality.
  - **Energy & Reliance**: Upstream margins supporting index stability.
  - **IT Sector**: Selective recovery aided by steady enterprise cloud adoption.
• **Actionable Takeaway**: Avoid chasing sharp intraday spikes; accumulate quality large-caps on dips through SIPs.`;
  }

  // 6. Generic Financial Co-Pilot Fallback
  return `💡 **Trade-In Financial Co-Pilot Analysis**:

Regarding **"${query}"**:

• **Market Context**: Indian financial indices are navigating macroeconomic factors including RBI liquidity stance, global crude prices, and live currency trends (USD/INR currently trading at **${prices.USD ? fmt(prices.USD) : '₹83.42'}**).
• **Core Principles**:
  1. Enforce a minimum **1:2 Risk-to-Reward ratio** on all active trades.
  2. Maintain automated stop-losses to protect against unexpected gap-downs.
  3. Ensure tax liabilities (STCG/LTCG/Crypto 30%) are budgeted prior to trade execution.
• **Next Step**: Select any quick prompt below or ask about specific tax calculations, risk metrics, or market outlooks!`;
}

// Formats text rendering with bold tags, bullet points, and spacing
const renderFormattedText = (content) => {
  if (!content) return null;
  const lines = content.split('\n');
  return lines.map((line, i) => {
    // Process **bold** patterns
    const parts = line.split(/(\*\*.*?\*\*)/g);
    const parsed = parts.map((part, j) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={j} style={{ color: '#fff', fontWeight: 600 }}>
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });

    if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
      return (
        <div key={i} style={{ display: 'flex', gap: '8px', margin: '4px 0', paddingLeft: '4px' }}>
          <span style={{ color: 'var(--accent-blue, #0099ff)', fontSize: '12px' }}>•</span>
          <span style={{ flex: 1 }}>{parsed}</span>
        </div>
      );
    }

    return (
      <div key={i} style={{ minHeight: line.trim() ? 'auto' : '8px', margin: '2px 0' }}>
        {parsed}
      </div>
    );
  });
};

export const AskTradeInAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [customKeyInput, setCustomKeyInput] = useState('');
  const [keySavedMessage, setKeySavedMessage] = useState(false);

  // Read stored custom key if present
  const [activeApiKey, setActiveApiKey] = useState(() => {
    try {
      return localStorage.getItem('tradein_gemini_api_key') || '';
    } catch {
      return '';
    }
  });

  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hello! I'm **Ask Trade-In AI**, your intelligent financial co-pilot. How can I assist you with Indian markets, portfolio analysis, or trading strategies today?",
      source: 'engine'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Redux state
  const activeAccountId = useSelector((state) => state.portfolio?.activeAccountId);
  const account = useSelector((state) =>
    state.portfolio?.accounts?.[activeAccountId || 'TRADER001']
  );
  const prices = useSelector((state) => state.market?.prices || {});

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const quickPrompts = [
    "Analyze my current portfolio risk",
    "What is the outlook on BTC/INR?",
    "Explain STCG vs LTCG tax in India",
    "Suggest diversification strategy"
  ];

  const handleSaveKey = (e) => {
    e.preventDefault();
    const trimmed = customKeyInput.trim();
    try {
      if (trimmed) {
        localStorage.setItem('tradein_gemini_api_key', trimmed);
        setActiveApiKey(trimmed);
      } else {
        localStorage.removeItem('tradein_gemini_api_key');
        setActiveApiKey('');
      }
      setKeySavedMessage(true);
      setTimeout(() => {
        setKeySavedMessage(false);
        setShowKeyModal(false);
      }, 1200);
    } catch (err) {
      console.error("Could not save key to localStorage:", err);
    }
  };

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMessage = { sender: 'user', text: query };
    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setLoading(true);

    // Context for prompt
    let contextPrompt = `You are "Ask Trade-In AI", an expert financial advisor specializing in Indian markets (NSE/BSE, NIFTY 50, SENSEX, Crypto INR pairs, Forex). Keep responses clear, professional, concise, and structured with bold points.
    
Current System Context:
- User Account: ${activeAccountId || 'Guest'}
- Live BTC Price: ${prices.BTC ? fmt(prices.BTC) : 'N/A'}
- Live ETH Price: ${prices.ETH ? fmt(prices.ETH) : 'N/A'}
- Live USD/INR: ${prices.USD ? fmt(prices.USD) : 'N/A'}`;

    if (account && account.portfolio && account.portfolio.length > 0) {
      contextPrompt += `\nPortfolio Assets: ${account.portfolio
        .map((p) => `${p.name} (Invested: ${fmt(p.invested)})`)
        .join(', ')}`;
    }

    const envKey = import.meta.env.VITE_GEMINI_API_KEY || '';
    const candidateKey = (activeApiKey || envKey).trim();

    // Valid Google AI Studio keys typically start with "AIzaSy" and do not contain periods/dots
    const looksLikeGeminiKey = candidateKey.startsWith('AIzaSy') && !candidateKey.includes('.');

    let aiReply = '';
    let source = 'engine';

    if (looksLikeGeminiKey) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${candidateKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [{ text: `${contextPrompt}\n\nUser Question: ${query}` }]
                }
              ]
            })
          }
        );

        const data = await response.json();
        if (response.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
          aiReply = data.candidates[0].content.parts[0].text;
          source = 'gemini';
        } else {
          console.warn("Gemini API call unsuccessful, falling back to Trade-In Financial Engine:", data.error || data);
        }
      } catch (err) {
        console.warn("Gemini fetch network error, using Trade-In Financial Engine:", err);
      }
    }

    // Seamless fallback to intelligent local financial analysis
    if (!aiReply) {
      await new Promise((resolve) => setTimeout(resolve, 350));
      aiReply = generateLocalFinancialAnalysis(query, account, activeAccountId, prices);
      source = 'engine';
    }

    setMessages((prev) => [...prev, { sender: 'ai', text: aiReply, source }]);
    setLoading(false);
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
      {/* FLOATING TRIGGER BUTTON */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            background: 'linear-gradient(135deg, #0099ff, #00d4a0)',
            color: '#fff',
            border: 'none',
            borderRadius: '50px',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(0, 153, 255, 0.3)',
            fontWeight: 700,
            fontFamily: 'Syne, sans-serif',
            fontSize: '13px',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          aria-label="Open Ask Trade-In AI assistant"
        >
          <Sparkles size={18} />
          <span>Ask Trade-In AI</span>
        </button>
      )}

      {/* CHAT DRAWER */}
      {isOpen && (
        <div
          style={{
            width: '390px',
            height: '540px',
            background: 'var(--bg-card, #0f1923)',
            border: '1px solid var(--border, #1a2535)',
            borderRadius: '16px',
            boxShadow: '0 12px 40px rgba(0,0,0,0.65)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            fontFamily: "'JetBrains Mono', monospace"
          }}
        >
          {/* HEADER */}
          <div
            style={{
              padding: '12px 16px',
              background: 'var(--bg-secondary, #0c1219)',
              borderBottom: '1px solid var(--border, #1a2535)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(0, 153, 255, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-blue, #0099ff)'
                }}
              >
                <Bot size={18} />
              </div>
              <div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '14px', color: '#fff' }}>
                  Ask Trade-In AI
                </div>
                <div style={{ fontSize: '10px', color: 'var(--accent-green, #00d4a0)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span>●</span>
                  <span>{activeApiKey ? 'Custom Gemini Connected' : 'Financial Engine Active'}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => setShowKeyModal(!showKeyModal)}
                title="Configure Gemini API Key"
                style={{
                  background: showKeyModal ? 'rgba(0, 153, 255, 0.2)' : 'transparent',
                  border: '1px solid var(--border, #1a2535)',
                  color: activeApiKey ? 'var(--accent-green, #00d4a0)' : 'var(--text-muted, #7a8ba0)',
                  borderRadius: '6px',
                  padding: '5px 8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '11px'
                }}
              >
                <Key size={13} />
                <span>API Key</span>
              </button>

              <button
                onClick={() => setIsOpen(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted, #7a8ba0)', cursor: 'pointer', padding: '4px' }}
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* API KEY CONFIGURATION MODAL BAR */}
          {showKeyModal && (
            <div
              style={{
                background: 'var(--bg-hover, #141e2a)',
                borderBottom: '1px solid var(--border, #1a2535)',
                padding: '12px 16px',
                fontSize: '11px'
              }}
            >
              <div style={{ fontWeight: 600, color: 'var(--accent-blue, #0099ff)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Key size={13} /> Google AI Studio Key (Optional)
              </div>
              <p style={{ color: 'var(--text-secondary, #7a8ba0)', fontSize: '10px', marginBottom: '8px', lineHeight: '1.4' }}>
                Enter your free Gemini key from <code>aistudio.google.com</code>. The app also works offline with the built-in financial rule engine!
              </p>
              <form onSubmit={handleSaveKey} style={{ display: 'flex', gap: '6px' }}>
                <input
                  type="password"
                  placeholder="AIzaSy..."
                  value={customKeyInput}
                  onChange={(e) => setCustomKeyInput(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'var(--bg-secondary, #0c1219)',
                    border: '1px solid var(--border, #1a2535)',
                    color: '#fff',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: 'var(--accent-green, #00d4a0)',
                    color: '#060a0f',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '11px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  {keySavedMessage ? <Check size={13} /> : 'Save'}
                </button>
              </form>
              {activeApiKey && (
                <div style={{ marginTop: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px', color: 'var(--text-muted, #7a8ba0)' }}>
                  <span>Custom key stored in browser</span>
                  <button
                    onClick={() => {
                      localStorage.removeItem('tradein_gemini_api_key');
                      setActiveApiKey('');
                      setCustomKeyInput('');
                    }}
                    style={{ background: 'none', border: 'none', color: 'var(--accent-red, #ff4560)', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Clear Key
                  </button>
                </div>
              )}
            </div>
          )}

          {/* MESSAGES CONTAINER */}
          <div
            style={{
              flex: 1,
              padding: '14px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  gap: '8px',
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '92%'
                }}
              >
                {m.sender === 'ai' && (
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'rgba(0,153,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#0099ff',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}
                  >
                    <Bot size={13} />
                  </div>
                )}
                <div
                  style={{
                    padding: '10px 14px',
                    borderRadius: m.sender === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                    background: m.sender === 'user' ? 'var(--accent-blue, #0099ff)' : 'var(--bg-secondary, #0c1219)',
                    color: '#e8f0fe',
                    fontSize: '11.5px',
                    lineHeight: '1.55',
                    border: m.sender === 'ai' ? '1px solid var(--border, #1a2535)' : 'none',
                    boxShadow: m.sender === 'user' ? '0 2px 8px rgba(0, 153, 255, 0.25)' : 'none'
                  }}
                >
                  {renderFormattedText(m.text)}

                  {m.sender === 'ai' && (
                    <div
                      style={{
                        marginTop: '8px',
                        paddingTop: '6px',
                        borderTop: '1px solid rgba(255,255,255,0.06)',
                        fontSize: '9.5px',
                        color: 'var(--text-muted, #7a8ba0)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span>{m.source === 'gemini' ? '✨ Gemini 1.5 Flash' : '⚡ Trade-In Financial Engine'}</span>
                      <span style={{ opacity: 0.7 }}>Simulated Market Data</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted, #7a8ba0)', fontSize: '11px', padding: '4px 8px' }}>
                <RefreshCw size={13} style={{ animation: 'spin 1s linear infinite' }} />
                <span>Trade-In AI is analyzing real-time data...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* QUICK PROMPTS */}
          <div style={{ padding: '0 12px 8px', display: 'flex', gap: '6px', overflowX: 'auto' }}>
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                disabled={loading}
                style={{
                  background: 'var(--bg-secondary, #0c1219)',
                  border: '1px solid var(--border, #1a2535)',
                  color: 'var(--text-secondary, #7a8ba0)',
                  fontSize: '10px',
                  padding: '5px 9px',
                  borderRadius: '6px',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-blue, #0099ff)';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border, #1a2535)';
                  e.currentTarget.style.color = 'var(--text-secondary, #7a8ba0)';
                }}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* INPUT BAR */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            style={{ padding: '10px 12px', borderTop: '1px solid var(--border, #1a2535)', display: 'flex', gap: '8px', background: 'var(--bg-secondary, #0c1219)' }}
          >
            <input
              type="text"
              placeholder="Ask about risk, BTC, taxes, or Nifty..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              style={{
                flex: 1,
                background: 'var(--bg-card, #0f1923)',
                border: '1px solid var(--border, #1a2535)',
                color: '#fff',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              style={{
                background: input.trim() && !loading ? 'var(--accent-blue, #0099ff)' : 'var(--bg-card, #0f1923)',
                color: input.trim() && !loading ? '#fff' : 'var(--text-muted, #7a8ba0)',
                border: '1px solid var(--border, #1a2535)',
                borderRadius: '8px',
                padding: '8px 14px',
                cursor: input.trim() && !loading ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s'
              }}
              aria-label="Send query"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AskTradeInAI;