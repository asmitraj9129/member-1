import React, { useState } from 'react';
import { Sliders, Play, RotateCcw, ArrowRight } from 'lucide-react';
import { runWhatIf } from '../services/api';

function SliderRow({ label, value, min, max, unit, onChange, color = '#3b82f6' }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.85rem' }}>
        <span style={{ color: 'var(--text-muted)' }}>{label}</span>
        <span style={{ fontWeight: 600, color }}>{value > 0 ? '+' : ''}{value}{unit}</span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={e => onChange(Number(e.target.value))} />
    </div>
  );
}

const riskColors = { RED: '#ef4444', ORANGE: '#f59e0b', GREEN: '#10b981' };

export default function WhatIfPanel() {
  const [rainfall, setRainfall] = useState(0);
  const [soil, setSoil] = useState(0);
  const [waterLevel, setWaterLevel] = useState(0);
  const [blockage, setBlockage] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    const res = await runWhatIf({
      rainfallChange: rainfall,
      soilChange: soil,
      waterLevelChange: waterLevel,
      bridgeBlockage: blockage,
    });
    setResult(res);
    setLoading(false);
  };

  const handleReset = () => {
    setRainfall(0); setSoil(0); setWaterLevel(0); setBlockage(false); setResult(null);
  };

  return (
    <div className="glass-panel">
      <div className="glass-header">
        <h3 className="glass-title"><Sliders size={18} style={{ color: '#8b5cf6' }} /> What-If Simulator</h3>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Baseline: ORANGE (52)</span>
      </div>

      <SliderRow label="Rainfall Change" value={rainfall} min={-30} max={80} unit="%" onChange={setRainfall} color="#3b82f6" />
      <SliderRow label="Soil Moisture Change" value={soil} min={-20} max={40} unit="%" onChange={setSoil} color="#10b981" />
      <SliderRow label="Water Level Change" value={waterLevel} min={-20} max={80} unit=" cm" onChange={setWaterLevel} color="#f59e0b" />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, padding: '12px', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Bridge B17 Blockage</span>
        <button onClick={() => setBlockage(!blockage)} style={{
          padding: '6px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
          background: blockage ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.05)',
          color: blockage ? '#ef4444' : 'var(--text-muted)',
          fontWeight: 600, fontSize: '0.8rem', transition: 'all 0.2s'
        }}>{blockage ? '🔴 BLOCKED' : '✅ CLEAR'}</button>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleRun} disabled={loading}>
          <Play size={16} /> {loading ? 'Simulating…' : 'Run Simulation'}
        </button>
        <button className="btn btn-secondary" onClick={handleReset}><RotateCcw size={16} /></button>
      </div>

      {result && (
        <div style={{ marginTop: 20, padding: 16, borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 10, fontWeight: 600 }}>SIMULATION RESULT</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Baseline</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: riskColors[result.baseline_risk] }}>{result.baseline_risk}</div>
              <div style={{ fontSize: '0.85rem' }}>{result.baseline_score}</div>
            </div>
            <ArrowRight size={20} style={{ color: 'var(--text-muted)' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Simulated</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: riskColors[result.simulated_risk] }}>{result.simulated_risk}</div>
              <div style={{ fontSize: '0.85rem' }}>{result.simulated_score}</div>
            </div>
            <div style={{ flex: 1, textAlign: 'right' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Time to Impact</div>
              <div style={{ fontWeight: 700, color: '#f59e0b' }}>{result.time_to_impact}</div>
            </div>
          </div>
          {result.affected_assets.length > 0 && (
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 6 }}>
              Affected: {result.affected_assets.join(', ')}
            </div>
          )}
          <div style={{ fontSize: '0.82rem', padding: '8px 10px', borderRadius: 6, background: `${riskColors[result.simulated_risk]}15`, color: riskColors[result.simulated_risk], border: `1px solid ${riskColors[result.simulated_risk]}30` }}>
            ⚡ {result.recommended_action}
          </div>
        </div>
      )}
    </div>
  );
}
