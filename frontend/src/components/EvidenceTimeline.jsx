import React from 'react';
import { Clock } from 'lucide-react';

const riskColors = { RED: '#ef4444', ORANGE: '#f59e0b', GREEN: '#10b981' };

export default function EvidenceTimeline({ replayEvents }) {
  if (!replayEvents || replayEvents.length === 0) return null;

  return (
    <div className="glass-panel">
      <div className="glass-header">
        <h3 className="glass-title"><Clock size={18} style={{ color: '#3b82f6' }} /> Evidence Timeline</h3>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Historical Event Replay</span>
      </div>
      <div style={{ position: 'relative', paddingLeft: 24 }}>
        {/* Vertical line */}
        <div style={{
          position: 'absolute', left: 7, top: 0, bottom: 0, width: 2,
          background: 'linear-gradient(to bottom, #3b82f6, #8b5cf6, #ef4444)',
          opacity: 0.3, borderRadius: 2
        }} />
        {replayEvents.map((event, i) => {
          const color = riskColors[event.risk] || '#10b981';
          return (
            <div key={i} style={{ position: 'relative', marginBottom: 16, paddingLeft: 16 }}>
              {/* Dot */}
              <div style={{
                position: 'absolute', left: -12, top: 4, width: 10, height: 10,
                borderRadius: '50%', background: color, border: '2px solid var(--bg-dark)',
                boxShadow: `0 0 6px ${color}80`
              }} />
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 2 }}>{event.time}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>{event.event}</div>
              <span style={{
                marginTop: 4, display: 'inline-block', padding: '1px 8px', borderRadius: 10,
                fontSize: '0.68rem', fontWeight: 700,
                background: `${color}15`, color, border: `1px solid ${color}30`
              }}>{event.risk}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
