import { useEffect, useRef } from 'react';
import { COLORS } from '../../data/markets.js';
import { formatINR } from '../../utils/format.js';

// Props:
//   holdings - array of { name, invested }
//   size     - canvas width/height in px (default 200)
//   centerLabel - small caption under the total, e.g. "INVESTED" or "TOTAL"
//
// This draws directly onto a <canvas> node, which is the clearest example of
// classic DOM manipulation (getContext, arc/fill drawing) wired up through
// React's ref + effect lifecycle instead of imperative document.* calls.
export default function AllocationPieChart({ holdings, size = 200, centerLabel = 'INVESTED' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, size, size);

    const total = holdings.reduce((sum, p) => sum + p.invested, 0);
    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.4;
    const ir = size * 0.25;
    let angle = -Math.PI / 2;

    holdings.forEach((p, i) => {
      const sweep = (p.invested / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, angle, angle + sweep);
      ctx.closePath();
      ctx.fillStyle = `${COLORS[i % COLORS.length]}cc`;
      ctx.fill();
      ctx.strokeStyle = '#060a0f';
      ctx.lineWidth = 2;
      ctx.stroke();
      angle += sweep;
    });

    ctx.beginPath();
    ctx.arc(cx, cy, ir, 0, Math.PI * 2);
    ctx.fillStyle = '#0c1219';
    ctx.fill();

    ctx.fillStyle = '#e8f0fe';
    ctx.font = `bold ${size < 190 ? 11 : 13}px Syne, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(formatINR(total), cx, cy - 5);
    ctx.fillStyle = '#7a8ba0';
    ctx.font = `${size < 190 ? 8 : 9}px JetBrains Mono, monospace`;
    ctx.fillText(centerLabel, cx, cy + 10);
  }, [holdings, size, centerLabel]);

  const total = holdings.reduce((sum, p) => sum + p.invested, 0);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      role="img"
      aria-label={`Portfolio allocation totalling ${formatINR(total)}`}
    />
  );
}
