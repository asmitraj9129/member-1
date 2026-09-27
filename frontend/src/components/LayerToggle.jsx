import React from 'react';
import { Layers } from 'lucide-react';

const layerDefs = [
  { key: 'floodPath', label: 'Flood Path', color: '#3b82f6' },
  { key: 'villages', label: 'Villages', color: '#ef4444' },
  { key: 'bridges', label: 'Bridges', color: '#f59e0b' },
  { key: 'shelters', label: 'Shelters', color: '#8b5cf6' },
];

export default function LayerToggle({ activeLayers, onToggle }) {
  return (
    <div className="glass-panel">
      <div className="glass-header">
        <h3 className="glass-title"><Layers size={18} style={{ color: '#3b82f6' }} /> Map Layers</h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {layerDefs.map(layer => {
          const isActive = activeLayers?.[layer.key];
          return (
            <div key={layer.key} onClick={() => onToggle(layer.key)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '8px 12px', borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                background: isActive ? `${layer.color}12` : 'rgba(255,255,255,0.02)',
                border: `1px solid ${isActive ? layer.color + '30' : 'var(--border-color)'}`,
                transition: 'all 0.2s ease'
              }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: isActive ? layer.color : 'var(--text-muted)'
                }} />
                <span style={{ fontSize: '0.85rem', color: isActive ? 'var(--text-main)' : 'var(--text-muted)' }}>{layer.label}</span>
              </div>
              <div style={{
                width: 36, height: 20, borderRadius: 10,
                background: isActive ? layer.color : 'rgba(255,255,255,0.08)',
                position: 'relative', transition: 'background 0.2s'
              }}>
                <div style={{
                  position: 'absolute', top: 3, left: isActive ? 18 : 3, width: 14, height: 14,
                  borderRadius: '50%', background: 'white',
                  transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.3)'
                }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
