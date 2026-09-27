import React, { useState, useEffect, useRef } from 'react';
import WhatIfPanel from '../components/WhatIfPanel';
import EvidenceTimeline from '../components/EvidenceTimeline';
import { getReplayEvents } from '../services/api';
import { Play, Pause, SkipForward, RotateCcw, Cpu, GitBranch } from 'lucide-react';

const riskColors = { RED: '#ef4444', ORANGE: '#f59e0b', GREEN: '#10b981' };

const liveSimSteps = [
  { t: 0, rainfall: 5, waterLevel: 85, soil: 45, risk: 18, level: 'GREEN' },
  { t: 1, rainfall: 15, waterLevel: 90, soil: 52, risk: 28, level: 'GREEN' },
  { t: 2, rainfall: 28, waterLevel: 98, soil: 60, risk: 42, level: 'ORANGE' },
  { t: 3, rainfall: 40, waterLevel: 112, soil: 70, risk: 55, level: 'ORANGE' },
  { t: 4, rainfall: 52, waterLevel: 124, soil: 77, risk: 67, level: 'ORANGE' },
  { t: 5, rainfall: 58, waterLevel: 134, soil: 82, risk: 78, level: 'RED' },
  { t: 6, rainfall: 62, waterLevel: 142, soil: 86, risk: 87, level: 'RED' },
];

function SimDisplay({ step }) {
  const color = riskColors[step.level] || '#10b981';
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
      {[
        { label: 'Rainfall', value: `${step.rainfall} mm`, color: '#3b82f6' },
        { label: 'Water Level', value: `${step.waterLevel} cm`, color: '#ef4444' },
        { label: 'Soil Moisture', value: `${step.soil}%`, color: '#10b981' },
      ].map(item => (
        <div key={item.label} className="glass-panel" style={{ padding: 14, textAlign: 'center', border: `1px solid ${item.color}20` }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 4 }}>{item.label}</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 700, color: item.color }}>{item.value}</div>
        </div>
      ))}
      <div className="glass-panel" style={{
        padding: 14, textAlign: 'center', gridColumn: '1 / -1',
        border: `1px solid ${color}30`, background: `${color}08`
      }}>
        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 4 }}>RISK ENGINE OUTPUT</div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: 12 }}>
          <span style={{ fontSize: '2.5rem', fontWeight: 700, color, fontFamily: 'Outfit,sans-serif' }}>{step.risk}</span>
          <span style={{
            padding: '4px 12px', borderRadius: 20, fontWeight: 700,
            background: `${color}20`, color, border: `1px solid ${color}40`, fontSize: '0.9rem'
          }}>{step.level}</span>
        </div>
      </div>
    </div>
  );
}

export default function Simulation() {
  const [replayEvents, setReplayEvents] = useState([]);
  const [simStep, setSimStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => { getReplayEvents().then(setReplayEvents); }, []);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setSimStep(prev => {
          if (prev >= liveSimSteps.length - 1) { setPlaying(false); return prev; }
          return prev + 1;
        });
      }, 1500);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [playing]);

  const handleReset = () => { setPlaying(false); setSimStep(0); };
  const handleNext = () => setSimStep(prev => Math.min(liveSimSteps.length - 1, prev + 1));

  const currentStep = liveSimSteps[simStep];
  const totalSteps = liveSimSteps.length;

  return (
    <div className="page-content">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: 4 }}>
          Digital Twin <span className="text-gradient">Simulation</span>
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Live sensor simulation, what-if scenarios, and historical replay
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Live Simulation */}
        <div className="glass-panel">
          <div className="glass-header">
            <h3 className="glass-title"><Cpu size={18} style={{ color: '#3b82f6' }} /> Software Sensor Simulation</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Step {simStep + 1}/{totalSteps}
            </span>
          </div>

          <SimDisplay step={currentStep} />

          {/* Progress bar */}
          <div style={{ margin: '16px 0 12px', background: 'rgba(255,255,255,0.05)', borderRadius: 4, height: 4 }}>
            <div style={{
              width: `${((simStep) / (totalSteps - 1)) * 100}%`,
              height: '100%', borderRadius: 4,
              background: 'var(--grad-primary)', transition: 'width 0.4s ease'
            }} />
          </div>
          
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <button className="btn btn-secondary" onClick={handleReset}><RotateCcw size={16} /> Reset</button>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => setPlaying(!playing)}>
              {playing ? <><Pause size={16} /> Pause</> : <><Play size={16} /> {simStep === 0 ? 'Start' : 'Resume'}</>}
            </button>
            <button className="btn btn-secondary" onClick={handleNext} disabled={playing}>
              <SkipForward size={16} />
            </button>
          </div>

          <div style={{ marginTop: 14, padding: '10px 12px', borderRadius: 8, background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            <GitBranch size={12} style={{ display: 'inline', marginRight: 6 }} />
            <strong>Future scope:</strong> This API accepts live MQTT/IoT sensor readings in production deployment.
          </div>
        </div>

        {/* What-If Panel */}
        <WhatIfPanel />
      </div>

      {/* Historical Replay */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <EvidenceTimeline replayEvents={replayEvents} />

        {/* Scenario Guide */}
        <div className="glass-panel">
          <div className="glass-header">
            <h3 className="glass-title">📋 Validated Scenarios</h3>
          </div>
          {[
            { name: 'Baseline', risk: 52, level: 'ORANGE', tti: '68 min', desc: 'Normal monsoon conditions' },
            { name: 'Heavy Rain (+30%)', risk: 78, level: 'RED', tti: '42 min', desc: 'Critical — Bridge B17 in flow path' },
            { name: 'Extreme Rain (+60%)', risk: 94, level: 'RED', tti: '18 min', desc: 'Imminent flood — full evacuation' },
            { name: 'Bridge Blockage', risk: 85, level: 'RED', tti: '20 min', desc: 'Debris blockage — downstream surge' },
            { name: 'Compound Hazard', risk: 97, level: 'RED', tti: '9 min', desc: 'All factors at peak simultaneously' },
          ].map((sc, i) => {
            const color = riskColors[sc.level] || '#10b981';
            return (
              <div key={i} style={{
                display: 'flex', gap: 12, alignItems: 'center', padding: '10px 0',
                borderBottom: i < 4 ? '1px solid var(--glass-border)' : 'none'
              }}>
                <div style={{
                  minWidth: 44, height: 44, borderRadius: 'var(--radius-sm)',
                  background: `${color}15`, color, fontWeight: 700, fontSize: '1.1rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>{sc.risk}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', marginBottom: 2 }}>{sc.name}</div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{sc.desc}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    padding: '2px 8px', borderRadius: 10, fontSize: '0.7rem', fontWeight: 700,
                    background: `${color}20`, color, border: `1px solid ${color}30`
                  }}>{sc.level}</span>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4 }}>⏱ {sc.tti}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
