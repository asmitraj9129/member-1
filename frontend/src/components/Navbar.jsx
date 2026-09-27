import React from 'react';
import { NavLink } from 'react-router-dom';
import { Activity, AlertTriangle, BarChart2, Layers, Settings, ShieldAlert, LogIn } from 'lucide-react';

export default function Navbar() {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Activity size={20} /> },
    { name: 'Simulation', path: '/simulation', icon: <Layers size={20} /> },
    { name: 'Alerts', path: '/alerts', icon: <AlertTriangle size={20} /> },
    { name: 'Analytics', path: '/analytics', icon: <BarChart2 size={20} /> },
  ];

  return (
    <div style={{
      width: '260px',
      background: 'rgba(15, 17, 26, 0.8)',
      backdropFilter: 'blur(20px)',
      borderRight: '1px solid var(--glass-border)',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 0',
      zIndex: 100
    }}>
      <div style={{ padding: '0 24px', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '40px', height: '40px', 
          borderRadius: '12px',
          background: 'var(--grad-primary)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          color: 'white',
          boxShadow: 'var(--shadow-glow)'
        }}>
          <ShieldAlert size={24} />
        </div>
        <div>
          <h2 style={{ fontSize: '1.2rem', margin: 0 }}>BasinPulse<span style={{color: 'var(--accent-primary)'}}>AI</span></h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Authority Console</span>
        </div>
      </div>

      <nav style={{ flex: 1, padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {navItems.map(item => (
          <NavLink
            key={item.name}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              textDecoration: 'none',
              color: isActive ? 'white' : 'var(--text-muted)',
              background: isActive ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
              border: isActive ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent',
              transition: 'all 0.2s ease',
              fontWeight: isActive ? 600 : 500
            })}
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div style={{ padding: '0 16px', marginTop: 'auto' }}>
        <div className="glass-panel" style={{ padding: '16px', marginBottom: '16px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>SYSTEM STATUS</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="live-indicator"></span>
            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Live Simulation</span>
          </div>
        </div>

        <NavLink to="/login" style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          padding: '12px 16px', color: 'var(--text-muted)', textDecoration: 'none'
        }}>
          <LogIn size={20} />
          Community View
        </NavLink>
      </div>
    </div>
  );
}
