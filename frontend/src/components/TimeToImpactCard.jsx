import React from 'react';
import { Timer } from 'lucide-react';

export default function TimeToImpactCard({ riskData }) {
  if (!riskData) return null;
  const { time_to_impact, risk_level, risk_score } = riskData;
  const minutes = parseInt(time_to_impact) || 42;
  const color = risk_level === 'RED' ? '#ef4444' : risk_level === 'ORANGE' ? '#f59e0b' : '#10b981';
  const pct = Math.max(0, Math.min(100, ((90 - minutes) / 90) * 100));

  return (
    <div className="glass-panel" style={{ border: `1px solid ${color}30`, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', bottom: -30, left: '50%', transform: 'translateX(-50%)',
        width: 120, height: 120, borderRadius: '50%', background: color, opacity: 0.05, filter: 'blur(30px)'
      }} />
      <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', letterSpacing: 1, marginBottom: 4 }}>TIME TO IMPACT</div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 4 }}>
        <span style={{ fontSize: '3rem', fontWeight: 700, color, fontFamily: 'Outfit, sans-serif', lineHeight: 1 }}>{minutes}</span>
        <span style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>min</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 6, color, fontSize: '0.8rem' }}>
        <Timer size={14} />
        Estimated arrival at Bridge B17
      </div>
      <div style={{ marginTop: 12, background: 'rgba(255,255,255,0.05)', borderRadius: 4, height: 4 }}>
        <div style={{
          width: `${pct}%`, height: '100%', borderRadius: 4,
          background: color, transition: 'width 1.5s ease'
        }} />
      </div>
      <div style={{ marginTop: 4, fontSize: '0.7rem', color: 'var(--text-muted)' }}>
        Urgency: {pct < 30 ? 'LOW' : pct < 60 ? 'MODERATE' : 'HIGH'}
      </div>
    </div>
  );
}
