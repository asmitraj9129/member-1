import React, { useState, useEffect } from 'react';
import { Activity, CloudRain, Droplets, Waves, Cpu, Database } from 'lucide-react';
import RiskCard from '../components/RiskCard';
import RiskChart from '../components/RiskChart';
import RiskMap from '../components/RiskMap';
import ConfidenceCard from '../components/ConfidenceCard';
import TimeToImpactCard from '../components/TimeToImpactCard';
import BasinHealthPassport from '../components/BasinHealthPassport';
import AlertCard from '../components/AlertCard';
import AlertActionPanel from '../components/AlertActionPanel';
import LayerToggle from '../components/LayerToggle';
import { getRiskData, getSensorData, getAlerts, getHistoricalRisk, getMapLayers, getBasinHealth } from '../services/api';

function SensorBadge({ icon, label, value, unit, color = '#3b82f6' }) {
  return (
    <div className="glass-panel" style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{
        width: 38, height: 38, borderRadius: 10,
        background: `${color}20`, color, display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>{icon}</div>
      <div>
        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 2 }}>{label}</div>
        <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{value}<span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: 2 }}>{unit}</span></div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [riskData, setRiskData] = useState(null);
  const [sensorData, setSensorData] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [mapLayers, setMapLayers] = useState(null);
  const [basinHealth, setBasinHealth] = useState(null);
  const [activeLayers, setActiveLayers] = useState({ villages: true, bridges: true, shelters: true, floodPath: true });
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const fetchAll = async () => {
    const [risk, sensor, alts, hist, layers, health] = await Promise.all([
      getRiskData(), getSensorData(), getAlerts(), getHistoricalRisk(), getMapLayers(), getBasinHealth()
    ]);
    setRiskData(risk);
    setSensorData(sensor);
    setAlerts(alts);
    setHistoricalData(hist);
    setMapLayers(layers);
    setBasinHealth(health);
    setLastUpdated(new Date());
  };

  useEffect(() => { fetchAll(); const interval = setInterval(fetchAll, 30000); return () => clearInterval(interval); }, []);

  const handleStatusChange = (id, newStatus) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  const handleLayerToggle = (key) => {
    setActiveLayers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const activeAlertsCount = alerts.filter(a => a.status !== 'Resolved').length;

  return (
    <div className="page-content">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', marginBottom: 4 }}>
            Authority <span className="text-gradient">Dashboard</span>
          </h1>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="live-indicator"></span>
            Live Simulation Active • Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <span style={{
            padding: '6px 14px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 600,
            background: 'rgba(239,68,68,0.15)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.3)',
            display: 'flex', alignItems: 'center', gap: 6
          }}>
            🔴 {activeAlertsCount} Active Alerts
          </span>
          <button className="btn btn-secondary" onClick={fetchAll} style={{ padding: '6px 14px', fontSize: '0.82rem' }}>
            <Activity size={14} /> Refresh
          </button>
        </div>
      </div>

      {/* Sensor Row */}
      {sensorData && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
          <SensorBadge icon={<CloudRain size={18} />} label="Rainfall (1hr)" value={sensorData.rainfall_mm_1h} unit="mm" color="#3b82f6" />
          <SensorBadge icon={<Waves size={18} />} label="Water Level" value={sensorData.water_level_cm} unit="cm" color="#ef4444" />
          <SensorBadge icon={<Droplets size={18} />} label="Soil Moisture" value={sensorData.soil_moisture_percent} unit="%" color="#10b981" />
          <SensorBadge icon={<Activity size={18} />} label="Water Rise Rate" value={sensorData.water_rise_rate_cm_hr} unit="cm/hr" color="#f59e0b" />
        </div>
      )}

      {/* Data source badge */}
      <div style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
        <span style={{ padding: '3px 10px', borderRadius: 12, fontSize: '0.72rem', background: 'rgba(59,130,246,0.1)', color: '#93c5fd', border: '1px solid rgba(59,130,246,0.2)' }}>
          <Database size={11} style={{ display: 'inline', marginRight: 4 }} />Source: Simulated MVP Data
        </span>
        <span style={{ padding: '3px 10px', borderRadius: 12, fontSize: '0.72rem', background: 'rgba(16,185,129,0.1)', color: '#6ee7b7', border: '1px solid rgba(16,185,129,0.2)' }}>
          <Cpu size={11} style={{ display: 'inline', marginRight: 4 }} />Engine: Hybrid Rule Engine
        </span>
      </div>

      {/* Main 3-col grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: 20, marginBottom: 20 }}>
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <RiskCard riskData={riskData} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <TimeToImpactCard riskData={riskData} />
            </div>
          </div>
          <RiskChart historicalData={historicalData} />
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <ConfidenceCard riskData={riskData} />
          <BasinHealthPassport basinHealth={basinHealth} />
        </div>
      </div>

      {/* Map + Layers + Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 20, marginBottom: 20 }}>
        <div style={{ position: 'relative' }}>
          <RiskMap layers={mapLayers} activeLayers={activeLayers} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <LayerToggle activeLayers={activeLayers} onToggle={handleLayerToggle} />
          <AlertActionPanel riskData={riskData} alerts={alerts} onStatusChange={handleStatusChange} />
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="glass-panel">
        <div className="glass-header">
          <h3 className="glass-title">🔔 Recent Alerts</h3>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            {alerts.filter(a => a.status !== 'Resolved').length} unresolved
          </span>
        </div>
        {alerts.slice(0, 3).map(alert => (
          <AlertCard key={alert.id} alert={alert} onStatusChange={handleStatusChange} />
        ))}
      </div>
    </div>
  );
}
