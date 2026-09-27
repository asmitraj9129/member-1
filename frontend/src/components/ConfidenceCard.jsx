import React from 'react';
import { ShieldCheck } from 'lucide-react';

function MiniBar({ label, value, color }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: '0.8rem' }}>
        <span style={{ color: 'var(--text-muted)' }}>{label}</span>
        <span style={{ fontWeight: 600, color }}>{value}%</span>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 4, height: 5 }}>
        <div style={{ width: `${value}%`, height: '100%', borderRadius: 4, background: color, transition: 'width 1s ease' }} />
      </div>
    </div>
  );
}

export default function ConfidenceCard({ riskData }) {
  if (!riskData) return null;
  const { confidence, top_drivers, uncertainty_note } = riskData;
  const pct = Math.round(confidence * 100);
  const color = pct > 70 ? '#10b981' : pct > 50 ? '#f59e0b' : '#ef4444';

  return (
    <div className="glass-panel">
      <div className="glass-header">
        <h3 className="glass-title"><ShieldCheck size={18} style={{ color: '#3b82f6' }} /> Confidence & Evidence</h3>
        <span style={{ fontSize: '1.5rem', fontWeight: 700, color }}>{pct}%</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div style={{ position: 'relative', width: 64, height: 64 }}>
          <svg viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)', width: 64, height: 64 }}>
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
            <circle cx="18" cy="18" r="15.9" fill="none" stroke={color} strokeWidth="3"
              strokeDasharray={`${pct} ${100 - pct}`} strokeLinecap="round" />
          </svg>
          <span style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
            fontSize: '0.75rem', fontWeight: 700, color
          }}>{pct}%</span>
        </div>
        <div>
          <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Model Confidence</div>
          {uncertainty_note && (
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4, maxWidth: 180 }}>{uncertainty_note}</div>
          )}
        </div>
      </div>

      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 8, fontWeight: 600 }}>TOP RISK DRIVERS</div>
      {top_drivers?.map((driver, i) => (
        <div key={i} style={{
          display: 'flex', gap: 8, alignItems: 'flex-start',
          padding: '6px 0', borderBottom: i < top_drivers.length - 1 ? '1px solid var(--glass-border)' : 'none'
        }}>
          <span style={{
            minWidth: 20, height: 20, borderRadius: '50%', background: 'rgba(239,68,68,0.15)',
            color: '#ef4444', fontSize: '0.7rem', fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>{i + 1}</span>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-main)' }}>{driver}</span>
        </div>
      ))}
    </div>
  );
}
