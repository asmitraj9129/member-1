import React, { useEffect, useState } from 'react';
import RiskChart from '../components/RiskChart';
import { getHistoricalRisk, getScenarios } from '../services/api';
import { BarChart2, TrendingUp } from 'lucide-react';

const riskColors = { RED: '#ef4444', ORANGE: '#f59e0b', GREEN: '#10b981' };

function ScenarioCard({ name, data }) {
  const color = riskColors[data?.risk_level] || '#10b981';
  return (
    <div className="glass-panel" style={{ border: `1px solid ${color}30`, flex: 1 }}>
      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>
        {name.toUpperCase()}
      </div>
      <div style={{ fontSize: '2rem', fontWeight: 700, color, lineHeight: 1 }}>{data?.risk_score}</div>
      <div style={{ fontSize: '0.8rem', color, marginTop: 4 }}>{data?.risk_level}</div>
      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 6 }}>
        ⏱ {data?.time_to_impact}
      </div>
    </div>
  );
}

export default function Analytics() {
  const [historicalData, setHistoricalData] = useState([]);
  const [scenarios, setScenarios] = useState(null);

  useEffect(() => {
    getHistoricalRisk().then(setHistoricalData);
    getScenarios().then(setScenarios);
  }, []);

  const tableData = [
    { metric: 'Rule Engine Accuracy', value: '91%', note: 'On sample events' },
    { metric: 'Alert Lead Time', value: '42 min', note: 'Before bridge impact' },
    { metric: 'False Positive Rate', value: '7%', note: 'Based on 14 events' },
    { metric: 'Data Sources', value: '4', note: 'Rain, Soil, River, GIS' },
    { metric: 'Coverage Area', value: '3 sub-basins', note: 'Pilot zone' },
    { metric: 'Simulation Speed', value: 'Real-time', note: 'Software simulation' },
  ];

  return (
    <div className="page-content">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: 4 }}>
          System <span className="text-gradient">Analytics</span>
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Performance metrics, scenario comparison, and historical analysis</p>
      </div>

      {/* Risk timeline */}
      <div style={{ marginBottom: 20 }}>
        <RiskChart historicalData={historicalData} />
      </div>

      {/* Scenario comparison */}
      <div className="glass-panel" style={{ marginBottom: 20 }}>
        <div className="glass-header">
          <h3 className="glass-title"><TrendingUp size={18} style={{ color: '#8b5cf6' }} /> Scenario Comparison</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Baseline vs Stress Scenarios</span>
        </div>
        <div style={{ display: 'flex', gap: 14 }}>
          {scenarios && Object.entries(scenarios).map(([name, data]) => (
            <ScenarioCard key={name} name={name.replace('_', ' ')} data={data} />
          ))}
        </div>

        {/* Visual comparison bars */}
        <div style={{ marginTop: 20 }}>
          {scenarios && Object.entries(scenarios).map(([name, data]) => {
            const color = riskColors[data.risk_level] || '#10b981';
            return (
              <div key={name} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: '0.82rem' }}>
                  <span style={{ color: 'var(--text-muted)', textTransform: 'capitalize' }}>{name.replace('_', ' ')}</span>
                  <span style={{ color, fontWeight: 600 }}>Risk Score: {data.risk_score}</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 4, height: 8 }}>
                  <div style={{
                    width: `${data.risk_score}%`, height: '100%', borderRadius: 4,
                    background: color, transition: 'width 1s ease'
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Performance Table */}
      <div className="glass-panel">
        <div className="glass-header">
          <h3 className="glass-title"><BarChart2 size={18} style={{ color: '#3b82f6' }} /> System Performance Metrics</h3>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              {['Metric', 'Value', 'Note'].map(h => (
                <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <td style={{ padding: '12px 12px', fontSize: '0.85rem', fontWeight: 500 }}>{row.metric}</td>
                <td style={{ padding: '12px 12px', fontSize: '0.85rem', color: '#3b82f6', fontWeight: 700 }}>{row.value}</td>
                <td style={{ padding: '12px 12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
