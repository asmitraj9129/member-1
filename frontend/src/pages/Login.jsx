import React, { useState } from 'react';
import { ShieldAlert, Users, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  return (
    <div className="page-content" style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '100%'
    }}>
      <div style={{ width: '100%', maxWidth: 480, textAlign: 'center' }}>
        <div style={{
          width: 64, height: 64, borderRadius: 20,
          background: 'var(--grad-primary)', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px', boxShadow: 'var(--shadow-glow)'
        }}>
          <ShieldAlert size={32} color="white" />
        </div>
        <h1 style={{ fontSize: '2rem', marginBottom: 8 }}>BasinPulse<span className="text-gradient">AI</span></h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: 40 }}>
          Flood Early Warning & Decision Support System
        </p>

        <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
          {[
            { key: 'authority', label: 'Authority Dashboard', icon: <ShieldAlert size={24} />, color: '#3b82f6', desc: 'Full access to risk, alerts, simulation, and action controls' },
            { key: 'community', label: 'Community View', icon: <Users size={24} />, color: '#10b981', desc: 'Public-facing risk levels and safety information' },
          ].map(r => (
            <div key={r.key} onClick={() => setRole(r.key)}
              className="glass-panel"
              style={{
                flex: 1, cursor: 'pointer',
                border: role === r.key ? `1px solid ${r.color}50` : '1px solid var(--glass-border)',
                background: role === r.key ? `${r.color}10` : 'var(--bg-panel)',
                transition: 'all 0.2s ease'
              }}>
              <div style={{ color: r.color, marginBottom: 8 }}>{r.icon}</div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{r.label}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{r.desc}</div>
            </div>
          ))}
        </div>

        <button
          className="btn btn-primary"
          style={{ width: '100%', padding: '14px', fontSize: '1rem', justifyContent: 'center' }}
          onClick={() => navigate('/dashboard')}
          disabled={!role}
        >
          <LogIn size={18} /> Enter as {role ? (role === 'authority' ? 'Authority' : 'Community') : '…'}
        </button>

        <p style={{ marginTop: 20, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          Hackathon MVP — No authentication required. Role-based UI switch only.
        </p>
      </div>
    </div>
  );
}
