import React from 'react';
import { CheckCircle, Eye, Wrench, XCircle, Bell } from 'lucide-react';

const levelColors = {
  RED: { color: '#ef4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.25)' },
  ORANGE: { color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.25)' },
  GREEN: { color: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.25)' },
};

const statusIcons = {
  New: <Bell size={14} />,
  Acknowledged: <Eye size={14} />,
  Inspection: <Wrench size={14} />,
  Resolved: <CheckCircle size={14} />,
};

const statusColors = {
  New: '#ef4444',
  Acknowledged: '#f59e0b',
  Inspection: '#3b82f6',
  Resolved: '#10b981',
};

export default function AlertCard({ alert, onStatusChange }) {
  const cfg = levelColors[alert.level] || levelColors.GREEN;
  const nextStatus = {
    New: 'Acknowledged',
    Acknowledged: 'Inspection',
    Inspection: 'Resolved',
    Resolved: null,
  };

  return (
    <div className="glass-panel" style={{
      border: `1px solid ${cfg.border}`,
      background: cfg.bg,
      marginBottom: 12,
      transition: 'all 0.3s ease'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{
              padding: '2px 8px', borderRadius: 4, fontSize: '0.7rem', fontWeight: 700,
              background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`
            }}>{alert.level}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{alert.time}</span>
          </div>
          <div style={{ fontWeight: 600, marginBottom: 4, fontSize: '0.95rem' }}>{alert.title}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: 8 }}>{alert.location}</div>
          {alert.affected.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {alert.affected.map(a => (
                <span key={a} style={{
                  padding: '2px 8px', borderRadius: 20, fontSize: '0.7rem',
                  background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)',
                  color: 'var(--text-muted)'
                }}>{a}</span>
              ))}
            </div>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 4,
            color: statusColors[alert.status], fontSize: '0.8rem', fontWeight: 500
          }}>
            {statusIcons[alert.status]} {alert.status}
          </div>
          {nextStatus[alert.status] && onStatusChange && (
            <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem' }}
              onClick={() => onStatusChange(alert.id, nextStatus[alert.status])}>
              → {nextStatus[alert.status]}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
