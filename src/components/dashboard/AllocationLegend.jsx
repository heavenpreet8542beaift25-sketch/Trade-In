import { COLORS } from '../../data/markets.js';

// Props: holdings - array of { name, invested }
export default function AllocationLegend({ holdings }) {
  const total = holdings.reduce((sum, p) => sum + p.invested, 0);
  return (
    <div>
      {holdings.map((p, i) => (
        <div className="pie-legend-item" key={p.id || p.name}>
          <div className="pie-legend-left">
            <div className="pie-dot" style={{ background: COLORS[i % COLORS.length] }} />
            <div className="pie-legend-name">{p.name}</div>
          </div>
          <div className="pie-legend-val">{((p.invested / total) * 100).toFixed(1)}%</div>
        </div>
      ))}
    </div>
  );
}
