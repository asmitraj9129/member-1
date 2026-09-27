import React, { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Flood path simulation
const floodPath = [
  [26.87, 73.91],
  [26.85, 73.92],
  [26.83, 73.93],
  [26.81, 73.93],
  [26.79, 73.94],
];

const villageRiskColors = { HIGH: '#ef4444', MEDIUM: '#f59e0b', LOW: '#10b981' };
const bridgeStatusColors = { CRITICAL: '#ef4444', MONITOR: '#f59e0b', SAFE: '#10b981' };

function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => { map.setView(center, 12); }, [center, map]);
  return null;
}

export default function RiskMap({ layers, activeLayers }) {
  const center = [26.83, 73.92];
  const active = activeLayers || { villages: true, bridges: true, shelters: true, floodPath: true };

  return (
    <div className="glass-panel" style={{ padding: 0, overflow: 'hidden', borderRadius: 'var(--radius-lg)' }}>
      <div style={{
        position: 'absolute', top: 16, left: 16, zIndex: 1000,
        background: 'rgba(15,17,26,0.85)', backdropFilter: 'blur(10px)',
        border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)',
        padding: '8px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 8
      }}>
        <span className="live-indicator"></span>
        <span style={{ color: 'var(--text-main)' }}>Live Risk Map</span>
      </div>
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: '420px', width: '100%', background: '#1a1d2d' }}
        zoomControl={true}
      >
        <MapUpdater center={center} />
        {/* Free OSM tiles — no API key needed. CSS filter makes them dark. */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          className="dark-tiles"
        />

        {/* Flood Path */}
        {active.floodPath && (
          <Polyline
            positions={floodPath}
            pathOptions={{ color: '#3b82f6', weight: 4, opacity: 0.8, dashArray: '8 6' }}
          />
        )}

        {/* Villages */}
        {active.villages && layers?.villages?.map(v => (
          <CircleMarker key={v.id} center={[v.lat, v.lng]} radius={10}
            pathOptions={{ fillColor: villageRiskColors[v.risk] || '#10b981', color: 'white', weight: 2, fillOpacity: 0.85 }}>
            <Popup>
              <div style={{ minWidth: 140 }}>
                <strong>{v.name}</strong>
                <div>Population: {v.population}</div>
                <div>Risk: <span style={{ color: villageRiskColors[v.risk], fontWeight: 600 }}>{v.risk}</span></div>
              </div>
            </Popup>
          </CircleMarker>
        ))}

        {/* Bridges */}
        {active.bridges && layers?.bridges?.map(b => (
          <CircleMarker key={b.id} center={[b.lat, b.lng]} radius={8}
            pathOptions={{ fillColor: bridgeStatusColors[b.status] || '#f59e0b', color: 'white', weight: 2, fillOpacity: 0.9 }}>
            <Popup>
              <div style={{ minWidth: 120 }}>
                <strong>{b.name}</strong>
                <div>Status: <span style={{ color: bridgeStatusColors[b.status], fontWeight: 600 }}>{b.status}</span></div>
              </div>
            </Popup>
          </CircleMarker>
        ))}

        {/* Shelters */}
        {active.shelters && layers?.shelters?.map(s => (
          <CircleMarker key={s.id} center={[s.lat, s.lng]} radius={8}
            pathOptions={{ fillColor: '#8b5cf6', color: 'white', weight: 2, fillOpacity: 0.85 }}>
            <Popup>
              <div style={{ minWidth: 130 }}>
                <strong>{s.name}</strong>
                <div>Capacity: {s.capacity} people</div>
                <div style={{ color: '#8b5cf6' }}>Relief Shelter</div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      {/* Legend */}
      <div style={{
        padding: '10px 16px', display: 'flex', gap: 20, flexWrap: 'wrap',
        borderTop: '1px solid var(--border-color)', fontSize: '0.75rem', color: 'var(--text-muted)'
      }}>
        {[
          { color: '#ef4444', label: 'High Risk / Critical' },
          { color: '#f59e0b', label: 'Medium Risk / Monitor' },
          { color: '#10b981', label: 'Low Risk / Safe' },
          { color: '#8b5cf6', label: 'Shelters' },
          { color: '#3b82f6', label: 'Flood Path' },
        ].map(item => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color }} />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
