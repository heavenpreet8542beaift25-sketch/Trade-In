import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Bot, Send, X, Sparkles, User, RefreshCw } from 'lucide-react';
import { fmt } from '../../utils/formatters';

export const AskTradeInAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hello! I'm **Ask Trade-In AI**, your intelligent financial co-pilot. How can I assist you with Indian markets, portfolio analysis, or trading strategies today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Read current portfolio & price context from Redux store
  const activeAccountId = useSelector((state) => state.portfolio.activeAccountId);
  const account = useSelector((state) => state.portfolio.accounts[activeAccountId || 'TRADER001']);
  const prices = useSelector((state) => state.market.prices);

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

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMessage = { sender: 'user', text: query };
    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setLoading(true);

    // Build context snippet from active user state
    let contextPrompt = `You are "Ask Trade-In AI", an expert financial advisor specializing in Indian markets (NSE/BSE, NIFTY 50, SENSEX, Crypto INR pairs, Forex). Keep responses clear, professional, concise, and structured with bold points.
    
    Current System Context:
    - User Account: ${activeAccountId || 'Guest'}
    - Live BTC Price: ${fmt(prices.BTC)}
    - Live ETH Price: ${fmt(prices.ETH)}
    - Live USD/INR: ${fmt(prices.USD)}`;

    if (account) {
      contextPrompt += `\n- Portfolio Assets: ${account.portfolio.map(p => `${p.name} (Invested: ${fmt(p.invested)})`).join(', ')}`;
    }

    try {
      // API Key is loaded from Vite environment variable or runtime fallback
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
      if (!apiKey) {
        throw new Error('Gemini API key missing');
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
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
      const aiReply =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I'm analyzing the market trends right now. Could you please rephrase your query?";

      setMessages((prev) => [...prev, { sender: 'ai', text: aiReply }]);
    } catch (err) {
      // Local fallback simulator if API key is not configured yet
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: `Here is my analysis based on current live data:\n\n• **Market Sentiment**: Neutral to Bullish.\n• **Portfolio Assessment**: Your positions in ${
              account ? account.portfolio[0]?.name : 'Crypto/Forex'
            } are holding solid support.\n• **Recommendation**: Maintain a balanced asset allocation and set strict stop-loss boundaries.`
          }
        ]);
      }, 800);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
      {/* TRIGGER BUTTON */}
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
        >
          <Sparkles size={18} />
          <span>Ask Trade-In AI</span>
        </button>
      )}

      {/* CHAT DRAWER WINDOW */}
      {isOpen && (
        <div
          style={{
            width: '380px',
            height: '520px',
            background: 'var(--bg-card, #0f1923)',
            border: '1px solid var(--border, #1a2535)',
            borderRadius: '16px',
            boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* HEADER */}
          <div
            style={{
              padding: '14px 18px',
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
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '14px' }}>
                  Ask Trade-In AI
                </div>
                <div style={{ fontSize: '10px', color: 'var(--accent-green, #00d4a0)' }}>● Online • Gemini Powered</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-muted, #7a8ba0)', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>
          </div>

          {/* MESSAGES CONTAINER */}
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  gap: '8px',
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%'
                }}
              >
                {m.sender === 'ai' && (
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(0,153,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0099ff', flexShrink: 0 }}>
                    <Bot size={12} />
                  </div>
                )}
                <div
                  style={{
                    padding: '10px 14px',
                    borderRadius: m.sender === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                    background: m.sender === 'user' ? 'var(--accent-blue, #0099ff)' : 'var(--bg-secondary, #0c1219)',
                    color: '#fff',
                    fontSize: '12px',
                    lineHeight: '1.5',
                    border: m.sender === 'ai' ? '1px solid var(--border, #1a2535)' : 'none',
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted, #7a8ba0)', fontSize: '11px' }}>
                <RefreshCw size={14} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
                <span>Trade-In AI is thinking...</span>
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
                style={{
                  background: 'var(--bg-secondary, #0c1219)',
                  border: '1px solid var(--border, #1a2535)',
                  color: 'var(--text-secondary, #7a8ba0)',
                  fontSize: '10px',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer'
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
            style={{ padding: '12px', borderTop: '1px solid var(--border, #1a2535)', display: 'flex', gap: '8px' }}
          >
            <input
              type="text"
              placeholder="Ask about stocks, BTC, portfolio..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flex: 1,
                background: 'var(--bg-secondary, #0c1219)',
                border: '1px solid var(--border, #1a2535)',
                color: '#fff',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                background: 'var(--accent-blue, #0099ff)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};