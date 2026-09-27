import React from 'react';
import { CheckCircle, Eye, Wrench, Bell } from 'lucide-react';

export default function AlertActionPanel({ riskData, alerts, onStatusChange }) {
  if (!riskData) return null;
  const { recommended_action } = riskData;
  const active = alerts?.filter(a => a.status !== 'Resolved') || [];

  return (
    <div className="glass-panel">
      <div className="glass-header">
        <h3 className="glass-title"><Bell size={18} style={{ color: '#ef4444' }} /> Action Workflow</h3>
        <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: '0.72rem', fontWeight: 700,
          background: 'rgba(239,68,68,0.15)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)' }}>
          {active.length} Active
        </span>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 8, fontWeight: 600 }}>RECOMMENDED ACTIONS</div>
        {recommended_action?.map((action, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6,
            padding: '8px 12px', borderRadius: 'var(--radius-sm)',
            background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)'
          }}>
            <span style={{
              minWidth: 22, height: 22, borderRadius: '50%', background: 'rgba(239,68,68,0.2)',
              color: '#ef4444', fontSize: '0.7rem', fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>{i + 1}</span>
            <span style={{ fontSize: '0.83rem' }}>{action}</span>
          </div>
        ))}
      </div>

      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 8, fontWeight: 600 }}>ALERT STATUS PIPELINE</div>
      <div style={{ display: 'flex', gap: 4, alignItems: 'center', marginBottom: 12 }}>
        {[
          { status: 'New', icon: <Bell size={14} />, color: '#ef4444' },
          { status: 'Acknowledged', icon: <Eye size={14} />, color: '#f59e0b' },
          { status: 'Inspection', icon: <Wrench size={14} />, color: '#3b82f6' },
          { status: 'Resolved', icon: <CheckCircle size={14} />, color: '#10b981' },
        ].map((step, i, arr) => (
          <React.Fragment key={step.status}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: `${step.color}20`, border: `2px solid ${step.color}50`,
                color: step.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 4px'
              }}>{step.icon}</div>
              <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>{step.status}</span>
            </div>
            {i < arr.length - 1 && <div style={{ flex: 1, height: 2, background: 'var(--border-color)', marginBottom: 20 }} />}
          </React.Fragment>
        ))}
      </div>

      {active.slice(0, 2).map(alert => {
        const nextStatus = { New: 'Acknowledged', Acknowledged: 'Inspection', Inspection: 'Resolved' };
        const next = nextStatus[alert.status];
        return next ? (
          <button key={alert.id} className="btn btn-secondary" style={{ width: '100%', marginBottom: 6, fontSize: '0.8rem', justifyContent: 'flex-start' }}
            onClick={() => onStatusChange && onStatusChange(alert.id, next)}>
            {alert.id}: {alert.title.substring(0, 30)}… → {next}
          </button>
        ) : null;
      })}
    </div>
  );
}
