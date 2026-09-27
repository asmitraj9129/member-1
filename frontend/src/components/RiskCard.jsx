import React from 'react';
import { ShieldAlert, TrendingUp, Zap, AlertCircle } from 'lucide-react';

const levelConfig = {
  RED: { color: '#ef4444', bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.3)', label: 'CRITICAL RISK', icon: <AlertCircle size={20} /> },
  ORANGE: { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)', label: 'HIGH RISK', icon: <Zap size={20} /> },
  GREEN: { color: '#10b981', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)', label: 'LOW RISK', icon: <ShieldAlert size={20} /> },
};

export default function RiskCard({ riskData }) {
  if (!riskData) return <div className="glass-panel" style={{ minHeight: 160 }}><div style={{ color: 'var(--text-muted)' }}>Loading risk data…</div></div>;
  const { risk_score, risk_level, probability, time_to_impact } = riskData;
  const cfg = levelConfig[risk_level] || levelConfig.GREEN;

  return (
    <div className="glass-panel" style={{
      border: `1px solid ${cfg.border}`,
      background: cfg.bg,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Glow blob */}
      <div style={{
        position: 'absolute', top: -40, right: -40,
        width: 120, height: 120, borderRadius: '50%',
        background: cfg.color, opacity: 0.08, filter: 'blur(40px)'
      }} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4, letterSpacing: 1 }}>FLOOD RISK INDEX</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
            <span style={{ fontSize: '3.5rem', fontWeight: 700, color: cfg.color, fontFamily: 'Outfit, sans-serif', lineHeight: 1 }}>
              {risk_score}
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: 6 }}>/100</span>
          </div>
          <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              padding: '3px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700,
              background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`
            }}>{cfg.label}</span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: cfg.color, marginBottom: 8 }}>{cfg.icon}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Flood Probability</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 600 }}>{Math.round(probability * 100)}%</div>
        </div>
      </div>

      {/* Risk Bar */}
      <div style={{ marginTop: 16, background: 'rgba(255,255,255,0.05)', borderRadius: 4, height: 6 }}>
        <div style={{
          width: `${risk_score}%`, height: '100%', borderRadius: 4,
          background: `linear-gradient(90deg, ${cfg.color}88, ${cfg.color})`,
          transition: 'width 1s ease'
        }} />
      </div>

      <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: '0.8rem' }}>
        <TrendingUp size={14} />
        <span>Time to impact: <strong style={{ color: cfg.color }}>{time_to_impact}</strong></span>
      </div>
    </div>
  );
}
