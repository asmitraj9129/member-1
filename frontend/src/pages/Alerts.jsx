import React, { useState, useEffect } from 'react';
import AlertCard from '../components/AlertCard';
import { getAlerts } from '../services/api';
import { Bell, CheckCircle, Filter } from 'lucide-react';

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    getAlerts().then(setAlerts);
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  const filters = ['All', 'New', 'Acknowledged', 'Inspection', 'Resolved'];
  const filtered = filter === 'All' ? alerts : alerts.filter(a => a.status === filter);

  const counts = {
    New: alerts.filter(a => a.status === 'New').length,
    Resolved: alerts.filter(a => a.status === 'Resolved').length,
  };

  return (
    <div className="page-content">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: 4 }}>
          Alert <span className="text-gradient">Management</span>
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Manage alert lifecycle: New → Acknowledged → Inspection → Resolved</p>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Total Alerts', value: alerts.length, color: '#3b82f6', icon: <Bell size={18} /> },
          { label: 'Active (New)', value: counts.New, color: '#ef4444', icon: <Bell size={18} /> },
          { label: 'In Progress', value: alerts.filter(a => ['Acknowledged','Inspection'].includes(a.status)).length, color: '#f59e0b', icon: <Bell size={18} /> },
          { label: 'Resolved', value: counts.Resolved, color: '#10b981', icon: <CheckCircle size={18} /> },
        ].map(stat => (
          <div key={stat.label} className="glass-panel" style={{ padding: '14px 18px', borderLeft: `3px solid ${stat.color}` }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 6 }}>{stat.label}</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: stat.color, lineHeight: 1 }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, alignItems: 'center' }}>
        <Filter size={16} style={{ color: 'var(--text-muted)' }} />
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={filter === f ? 'btn btn-primary' : 'btn btn-secondary'}
            style={{ padding: '6px 14px', fontSize: '0.82rem' }}>
            {f}
          </button>
        ))}
      </div>

      {/* Alerts */}
      <div>
        {filtered.length === 0 ? (
          <div className="glass-panel" style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>
            No alerts for this filter.
          </div>
        ) : (
          filtered.map(alert => (
            <AlertCard key={alert.id} alert={alert} onStatusChange={handleStatusChange} />
          ))
        )}
      </div>
    </div>
  );
}
