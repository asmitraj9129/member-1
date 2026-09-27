import React from 'react';
import { Heart, Droplets, Wind, Waves } from 'lucide-react';

function HealthBar({ label, value, icon, color }) {
  const health = 100 - value;
  const barColor = health > 60 ? '#10b981' : health > 35 ? '#f59e0b' : '#ef4444';
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: '0.82rem' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)' }}>
          {icon} {label}
        </span>
        <span style={{ fontWeight: 600, color: barColor }}>{health}%</span>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 4, height: 5 }}>
        <div style={{ width: `${health}%`, height: '100%', borderRadius: 4, background: barColor, transition: 'width 1s ease' }} />
      </div>
    </div>
  );
}

export default function BasinHealthPassport({ basinHealth }) {
  if (!basinHealth) return null;
  const { drainage_capacity, soil_absorption, river_conveyance, infrastructure_risk, overall_health, status } = basinHealth;
  const statusColors = { STRESSED: '#f59e0b', CRITICAL: '#ef4444', HEALTHY: '#10b981' };
  const statusColor = statusColors[status] || '#f59e0b';

  return (
    <div className="glass-panel">
      <div className="glass-header">
        <h3 className="glass-title"><Heart size={18} style={{ color: statusColor }} /> Basin Health Passport</h3>
        <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: '0.72rem', fontWeight: 700,
          background: `${statusColor}20`, color: statusColor, border: `1px solid ${statusColor}40` }}>
          {status}
        </span>
      </div>
      <div style={{ fontSize: '2.5rem', fontWeight: 700, color: statusColor, textAlign: 'center', margin: '8px 0 16px' }}>
        {overall_health}<span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/100</span>
      </div>
      <HealthBar label="Drainage Capacity" value={100 - drainage_capacity} icon={<Droplets size={14} />} />
      <HealthBar label="Soil Absorption" value={100 - soil_absorption} icon={<Wind size={14} />} />
      <HealthBar label="River Conveyance" value={100 - river_conveyance} icon={<Waves size={14} />} />
      <HealthBar label="Infrastructure Risk" value={infrastructure_risk} icon={<Heart size={14} />} />
    </div>
  );
}
