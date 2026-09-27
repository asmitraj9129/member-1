import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement, BarElement,
  Title, Tooltip, Legend, Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler);

export default function RiskChart({ historicalData }) {
  if (!historicalData || historicalData.length === 0) {
    return <div className="glass-panel" style={{ minHeight: 200, display:'flex', alignItems:'center', justifyContent:'center', color:'var(--text-muted)' }}>Loading chart…</div>;
  }

  const labels = historicalData.map(d => d.time);
  const riskValues = historicalData.map(d => d.risk);
  const rainfallValues = historicalData.map(d => d.rainfall);

  const data = {
    labels,
    datasets: [
      {
        label: 'Risk Score',
        data: riskValues,
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239,68,68,0.1)',
        borderWidth: 2.5,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#ef4444',
        pointRadius: 4,
        pointHoverRadius: 7,
        yAxisID: 'y',
      },
      {
        label: 'Rainfall (mm)',
        data: rainfallValues,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59,130,246,0.08)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#3b82f6',
        pointRadius: 3,
        pointHoverRadius: 6,
        borderDash: [5, 3],
        yAxisID: 'y1',
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: {
        labels: { color: '#94a3b8', font: { family: 'Inter', size: 12 }, boxWidth: 20, padding: 16 }
      },
      tooltip: {
        backgroundColor: 'rgba(25, 28, 41, 0.95)',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        titleColor: '#f0f2f5',
        bodyColor: '#94a3b8',
        padding: 12,
        cornerRadius: 8,
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.04)' },
        ticks: { color: '#94a3b8', font: { family: 'Inter', size: 11 } }
      },
      y: {
        position: 'left',
        min: 0, max: 100,
        grid: { color: 'rgba(255,255,255,0.04)' },
        ticks: { color: '#94a3b8', font: { family: 'Inter', size: 11 } },
        title: { display: true, text: 'Risk Score', color: '#94a3b8' }
      },
      y1: {
        position: 'right',
        grid: { drawOnChartArea: false },
        ticks: { color: '#94a3b8', font: { family: 'Inter', size: 11 } },
        title: { display: true, text: 'Rainfall (mm)', color: '#94a3b8' }
      }
    }
  };

  return (
    <div className="glass-panel">
      <div className="glass-header">
        <h3 className="glass-title">📈 Risk vs Rainfall Timeline</h3>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Last 6 hours</span>
      </div>
      <div style={{ height: 220 }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
