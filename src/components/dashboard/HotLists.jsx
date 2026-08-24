import { useEffect, useRef } from 'react';

export default function HotLists() {
  const containerRef = useRef(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;

    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';
    node.appendChild(widgetDiv);

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js';
    script.innerHTML = JSON.stringify({
      colorTheme: 'dark',
      dateRange: '12M',
      showChart: true,
      locale: 'en',
      isTransparent: true,
      showSymbolLogo: false,
      width: '100%',
      height: '500',
      plotLineColorGrowing: 'rgba(41,98,255,1)',
      plotLineColorFalling: 'rgba(255,69,96,1)',
      gridLineColor: 'rgba(26,37,53,1)',
      scaleFontColor: 'rgba(122,139,160,1)',
      belowLineFillColorGrowing: 'rgba(41,98,255,0.12)',
      belowLineFillColorFalling: 'rgba(255,69,96,0.12)',
      belowLineFillColorGrowingBottom: 'rgba(41,98,255,0)',
      belowLineFillColorFallingBottom: 'rgba(255,69,96,0)',
      symbolActiveColor: 'rgba(41,98,255,0.12)'
    });
    node.appendChild(script);

    return () => { node.innerHTML = ''; };
  }, []);

  return (
    <div className="card" style={{ marginBottom: 32, overflow: 'hidden' }}>
      <div className="tradingview-widget-container" ref={containerRef} />
    </div>
  );
}
